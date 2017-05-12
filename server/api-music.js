module.exports = apiMusic

const debug = require('debug')('play:api-music')
const LastFM = require('last-fm')

const entity = require('../src/entity')
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

const lastfm = new LastFM(secret.lastfm.key, {
  userAgent: config.apiUserAgent,
  minArtistListeners: 500,
  minTrackListeners: 0
})

/**
 * Expose Last.fm music data.
 */
function apiMusic (opts, cb) {
  debug('%o', opts)
  if (!METHODS.has(opts.method)) {
    return cb(new Error('Invalid or missing `method` parameter'))
  }

  lastfm[opts.method](opts, (err, data) => {
    if (err) return cb(err)
    addUrlProp(data)
    cb(null, data)
  })
}

function addUrlProp (result) {
  if (!result) return
  const results = Array.isArray(result)
    ? result
    : [result]

  results.forEach(result => {
    const url = entity.encode(result)
    if (url) result.url = url

    addUrlProp(result.result)
    addUrlProp(result.artists)
    addUrlProp(result.albums)
    addUrlProp(result.tracks)
    addUrlProp(result.top)
  })
}
