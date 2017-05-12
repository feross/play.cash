module.exports = {
  init
}

const compress = require('compression')
const crypto = require('crypto')
const express = require('express')
const fs = require('fs')
const http = require('http')
const mustache = require('mustache')
const path = require('path')
const session = require('express-session')
const url = require('url')

const api = require('./api')
const config = require('../config')
const secret = require('../secret')

function init (server, sessionStore) {
  const app = express()
  server.on('request', app)

  // Set up templating
  const template = fs.readFileSync(path.join(config.root, 'server', 'index.mustache'), 'utf8')
  app.set('view engine', 'mustache')
  app.set('views', path.join(config.root, 'server'))
  app.engine('mustache', (templatePath, params, cb) => {
    params.initialStore = JSON.stringify(params.initialStore)
    const html = mustache.render(template, params)
    cb(null, html)
  })

  app.set('trust proxy', true) // Trust the nginx reverse proxy
  app.use(compress()) // Use gzip

  // Add headers
  app.use((req, res, next) => {
    const extname = path.extname(url.parse(req.url).pathname)

    // Add cross-domain header for fonts, required by spec, Firefox, and IE.
    if (['.eot', '.ttf', '.otf', '.woff', '.woff2'].includes(extname)) {
      res.header('Access-Control-Allow-Origin', '*')
    }

    // Disable browser mime-type sniffing. Reduces exposure to drive-by download attacks when
    // serving user uploaded content.
    res.header('X-Content-Type-Options', 'nosniff')

    // Prevent rendering of site within a frame.
    res.header('X-Frame-Options', 'DENY')

    // Enable browser XSS filtering. Usually enabled by default, but this header re-enables it
    // if it was disabled by the user, and asks the the browser to prevent rendering of the
    // page if an attack is detected.
    res.header('X-XSS-Protection', '1; mode=block')

    if (config.isProd) {
      // Redirect to main site url, over https
      if (req.method === 'GET' &&
          (req.protocol !== 'https' || req.hostname !== config.host)) {
        return res.redirect(301, config.httpOrigin + req.url)
      }

      // Use HTTP Strict Transport Security
      // Lasts 2 years, incl. subdomains, allow browser preload list
      res.header(
        'Strict-Transport-Security',
        'max-age=63072000; includeSubDomains; preload'
      )
    }

    next()
  })

  const staticOpts = { maxAge: config.maxAge }

  app.use(express.static(path.join(config.root, 'static'), staticOpts))
  app.use(express.static(path.dirname(require.resolve('tachyons')), staticOpts))

  app.use(session({
    store: sessionStore,
    secret: secret.cookie,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
      secure: config.isProd
    }
  }))

  const bundleHash = config.isProd &&
    '?' + createHash(fs.readFileSync(path.join(config.root, 'static', 'bundle.js')))

  const styleHash = config.isProd &&
    '?' + createHash(fs.readFileSync(path.join(config.root, 'static', 'style.css')))

  app.use((req, res, next) => {
    res.locals.initialStore = {
      userName: req.session.user && req.session.user.userName
    }
    res.locals.hashes = {
      bundle: bundleHash || '',
      style: styleHash || ''
    }
    next()
  })

  app.get('/api/:method', (req, res, next) => {
    const method = api[req.params.method]
    if (!method) return next()

    method(req.query, (err, result) => {
      if (err) {
        const code = typeof err.code === 'number' ? err.code : 500
        return res.status(code).json({ error: err.message })
      }
      res.json({ result: result })
    })
  })

  // TODO: Return 404 error when there is no song match!
  app.get('*', (req, res) => {
    // Canonicalize URLs that come from Open Search, or are typed in by users
    if (req.url.includes('%20')) {
      res.redirect(301, config.httpOrigin + req.url.replace(/%20/g, '-'))
    }
    res.render('index', { config: config })
  })

  app.get('/500', (req, res, next) => {
    next(new Error('Manually visited /500'))
  })

  app.get('*', (req, res) => {
    res.locals.initialStore.error = `404: ${http.STATUS_CODES[404]}`
    res.status(404).render('index')
  })

  app.use((err, req, res, next) => {
    console.error(err.stack)
    const code = typeof err.code === 'number' ? err.code : 500
    if (res.locals.initialStore) {
      res.locals.initialStore.error = `${code}: ${http.STATUS_CODES[code]}`
    }
    res.status(code).render('index')
  })
}

/**
 * Create a cache-busting hash for static assets like `bundle.js` and `style.css`
 */
function createHash (data) {
  return crypto.createHash('sha256')
    .update(data)
    .digest('base64')
    .slice(0, 20)
    .replace(/\+|\/|=/g, '')
}
