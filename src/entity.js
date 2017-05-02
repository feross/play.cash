module.exports = {
  encode,
  decode
}

const slug = require('./lib/slug')
const Router = require('./lib/router')
const routes = require('./routes')

const router = new Router(routes)

const entities = new Set(routes.filter(route => route[2]).map(route => route[0]))

/**
 * Convert an entity object (artist, album, etc.) to a url.
 *
 *   encode({ type: 'artist', name: 'Ed Sheeran' }) // '/Ed-Sheeran'
 *   encode({ type: 'track', name: 'Believe', artist: 'Cher' }) // '/Cher/Believe'
 */

function encode (data) {
  switch (data.type) {
    case 'album': {
      const name = slug.encode(data.name)
      const artist = slug.encode(data.artist)
      return router.create('album', { name, artist })
    }

    case 'artist': {
      const name = slug.encode(data.name)
      return router.create('artist', { name })
    }

    case 'track': {
      const name = slug.encode(data.name)
      const artist = slug.encode(data.artist)
      return router.create('track', { name, artist })
    }

    default: {
      return null
    }
  }
}

/**
 * Convert a url to an entity object.
 *
 *   decode('/Ed-Sheeran') // { type: 'artist', name: 'Ed Sheeran' }
 *   decode('/Cher/Believe') // { type: 'track', name: 'Believe', artist: 'Cher' }
 */

function decode (pathname) {
  const loc = router.match(pathname)
  if (!entities.has(loc.name)) return null

  const ret = {
    type: loc.name
  }
  Object.keys(loc.params).forEach(key => {
    ret[key] = slug.decode(loc.params[key])
  })
  ret.url = loc.pathname

  return ret
}
