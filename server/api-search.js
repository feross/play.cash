module.exports = apiSearch

const debug = require('debug')('play:api-metadata')
const LastFM = require('last-fm')

const config = require('../config')
const secret = require('../secret')

const lastfm = new LastFM(secret.lastfm.key, config.apiUserAgent)

/**
 * Search Last.fm. Returns a collection of search results that match the
 * query parameters.
 */
function apiSearch (opts, cb) {
  debug('%o', opts)

  lastfm.search(opts, cb)
}
