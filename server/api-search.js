module.exports = apiSearch

const debug = require('debug')('play:api-metadata')
const LastFM = require('last-fm')
const parallel = require('run-parallel')

const config = require('../config')
const secret = require('../secret')

const lastfm = new LastFM(secret.lastfm.key, config.apiUserAgent)

/**
 * Search Last.fm. Returns a collection of search results that match the
 * query parameters.
 */
function apiSearch (opts, cb) {
  debug('%o', opts)

  parallel({
    tracks: (cb) => {
      lastfm.trackSearch({ track: opts.q, limit: 10 }, cb)
    },
    artists: (cb) => {
      lastfm.artistSearch({ artist: opts.q, limit: 10 }, cb)
    },
    albums: (cb) => {
      lastfm.albumSearch({ album: opts.q, limit: 10 }, cb)
    }
  }, (err, results) => {
    if (err) return cb(err)
    console.log(results)
    cb(null, results)
  })
}
