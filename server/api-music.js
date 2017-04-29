module.exports = apiMusic

const debug = require('debug')('play:api-music')
const LastFM = require('last-fm')

const config = require('../config')
const secret = require('../secret')

const lastfm = new LastFM(secret.lastfm.key, config.apiUserAgent)

/**
 * Expose Last.fm music data.
 */
function apiMusic (opts, cb) {
  debug('%o', opts)
  switch (opts.method) {
    case 'search':
      return lastfm.search(opts, cb)
    case 'albumInfo':
      return lastfm.albumInfo(opts, cb)
    case 'albumTopTags':
      return lastfm.albumTopTags(opts, cb)
    case 'albumSearch':
      return lastfm.albumSearch(opts, cb)
    case 'artistCorrection':
      return lastfm.artistCorrection(opts, cb)
    case 'artistInfo':
      return lastfm.artistInfo(opts, cb)
    case 'artistSimilar':
      return lastfm.artistSimilar(opts, cb)
    case 'artistTopAlbums':
      return lastfm.artistTopAlbums(opts, cb)
    case 'artistTopTags':
      return lastfm.artistTopTags(opts, cb)
    case 'artistTopTracks':
      return lastfm.artistTopTracks(opts, cb)
    case 'artistSearch':
      return lastfm.artistSearch(opts, cb)
    case 'chartTopArtists':
      return lastfm.chartTopArtists(opts, cb)
    case 'chartTopTags':
      return lastfm.chartTopTags(opts, cb)
    case 'chartTopTracks':
      return lastfm.chartTopTracks(opts, cb)
    case 'geoTopArtists':
      return lastfm.geoTopArtists(opts, cb)
    case 'geoTopTracks':
      return lastfm.geoTopTracks(opts, cb)
    case 'tagInfo':
      return lastfm.tagInfo(opts, cb)
    case 'tagSimilar':
      return lastfm.tagSimilar(opts, cb)
    case 'tagTopAlbums':
      return lastfm.tagTopAlbums(opts, cb)
    case 'tagTopArtists':
      return lastfm.tagTopArtists(opts, cb)
    case 'tagTopTags':
      return lastfm.tagTopTags(opts, cb)
    case 'tagTopTracks':
      return lastfm.tagTopTracks(opts, cb)
    case 'tagWeeklyChartList':
      return lastfm.tagWeeklyChartList(opts, cb)
    case 'trackCorrection':
      return lastfm.trackCorrection(opts, cb)
    case 'trackInfo':
      return lastfm.trackInfo(opts, cb)
    case 'trackSimilar':
      return lastfm.trackSimilar(opts, cb)
    case 'trackTopTags':
      return lastfm.trackTopTags(opts, cb)
    case 'trackSearch':
      return lastfm.trackSearch(opts, cb)
    default:
      return cb(new Error('Invalid or missing `method` parameter'))
  }
}
