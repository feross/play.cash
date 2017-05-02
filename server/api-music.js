module.exports = apiMusic

const debug = require('debug')('play:api-music')
const LastFM = require('last-fm')

const config = require('../config')
const secret = require('../secret')

const METHODS = new Set([
  'search',
  'albumInfo',
  'albumTopTags',
  'albumSearch',
  'artistCorrection',
  'artistInfo',
  'artistSimilar',
  'artistTopAlbums',
  'artistTopTags',
  'artistTopTracks',
  'artistSearch',
  'chartTopArtists',
  'chartTopTags',
  'chartTopTracks',
  'geoTopArtists',
  'geoTopTracks',
  'tagInfo',
  'tagSimilar',
  'tagTopAlbums',
  'tagTopArtists',
  'tagTopTags',
  'tagTopTracks',
  'trackCorrection',
  'trackInfo',
  'trackSimilar',
  'trackTopTags',
  'trackSearch'
])

const lastfm = new LastFM(secret.lastfm.key, config.apiUserAgent)

/**
 * Expose Last.fm music data.
 */
function apiMusic (opts, cb) {
  debug('%o', opts)
  if (METHODS.has(opts.method)) {
    lastfm[opts.method](opts, cb)
  } else {
    cb(new Error('Invalid or missing `method` parameter'))
  }
}
