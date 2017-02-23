module.exports = {
  init
}

const compress = require('compression')
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

    // Prevents IE and Chrome from MIME-sniffing a response to reduce exposure to
    // drive-by download attacks when serving user uploaded content.
    res.header('X-Content-Type-Options', 'nosniff')

    // Prevent rendering of site within a frame
    res.header('X-Frame-Options', 'DENY')

    // Enable the XSS filter built into most recent web browsers. It's usually
    // enabled by default anyway, so role of this headers is to re-enable for this
    // particular website if it was disabled by the user.
    res.header('X-XSS-Protection', '1; mode=block')

    // Force IE to use latest rendering engine or Chrome Frame
    res.header('X-UA-Compatible', 'IE=Edge,chrome=1')

    if (config.isProd) {
      // Use HTTP Strict Transport Security
      // Lasts 1 year, incl. subdomains, allow browser preload list
      res.header(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      )

      // Redirect to main site url, over https
      if (req.method === 'GET' &&
          (req.protocol !== 'https' || req.hostname !== config.hostname)) {
        return res.redirect(301, config.httpOrigin + req.url)
      }
    }

    next()
  })

  app.use(express.static(path.join(config.root, 'static')))
  app.use(express.static(path.dirname(require.resolve('tachyons'))))

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

  app.use((req, res, next) => {
    res.locals.initialStore = {}
    res.locals.initialStore.userName = req.session.user && req.session.user.userName
    next()
  })

  // TODO: remove
  // app.use(require('cors')({
  //   origin: true,
  //   credentials: true
  // }))

  app.get('/api/search', (req, res) => {
    api.search(req.query, (err, result) => {
      if (err) return res.status(err.code || 500).json({ error: err.message })
      res.json({ result: result })
    })
  })

  // TODO: Return 404 error when there is no song match!
  app.get('*', (req, res) => {
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
    const code = err.code || 500
    res.locals.initialStore.error = `${code}: ${http.STATUS_CODES[code]}`
    res.status(code).render('index')
  })
}
