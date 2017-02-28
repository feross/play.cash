module.exports = apiVideo

const debug = require('debug')('play:api-video')
const get = require('simple-get')
const querystring = require('querystring')

const config = require('../config')
const secret = require('../secret')

/**
 * Search YouTube. Returns a collection of video results that match the query
 * parameters.
 *
 * Options:
 *   - q: The search query (required)
 *   - maxResults: Max number of items in the result set, 0 to 50 (default: 5)
 *
 * Docs: https://developers.google.com/youtube/v3/docs/search/list
 */
function apiVideo (opts, cb) {
  if (typeof opts.maxResults === 'string') {
    opts.maxResults = Number(opts.maxResults)
  }

  debug('%o', opts)

  const url = 'https://www.googleapis.com/youtube/v3/search'
  const params = {
    // The part parameter specifies a comma-separated list of one or more search
    // resource properties that the API response will include. (string)
    part: 'snippet',

    // The maxResults parameter specifies the maximum number of items that should
    // be returned in the result set. Acceptable values are 0 to 50, inclusive. The
    // default value is 5. (unsigned integer)
    maxResults: opts.maxResults
      ? Math.min(Math.max(opts.maxResults, 0), 50)
      : 5,

    // The safeSearch parameter indicates whether the search results should include
    // restricted content as well as standard content. Acceptable values are:
    // 'moderate', 'none', 'strict'. (string)
    safeSearch: 'none',

    // The videoEmbeddable parameter lets you to restrict a search to only videos
    // that can be embedded into a webpage. If you specify a value for this
    // parameter, you must also set the type parameter's value to video. Acceptable
    // values are: 'any', 'true'. (string)
    videoEmbeddable: 'true',

    // The videoSyndicated parameter lets you to restrict a search to only videos
    // that can be played outside youtube.com. If you specify a value for this
    // parameter, you must also set the type parameter's value to video. Acceptable
    // values are: 'any', 'true'. (string)
    videoSyndicated: 'any',

    // The type parameter restricts a search query to only retrieve a particular
    // type of resource. The value is a comma-separated list of resource types. The
    // default value is 'video,channel,playlist'. Acceptable values are: 'channel',
    // 'playlist', 'video'. (string)
    type: 'video',

    // The q parameter specifies the query term to search for. Your request can
    // also use the Boolean NOT (-) and OR (|) operators to exclude videos or to
    // find videos that are associated with one of several search terms. (string)
    q: opts.q
  }

  sendRequest(url, params, onResponse)

  function onResponse (err, data) {
    if (err) return cb(err)
    const items = data.items.map(item => {
      return {
        id: item.id.videoId,
        title: item.snippet.title
      }
    })
    cb(null, items)
  }
}

function sendRequest (urlBase, params, cb) {
  params.key = secret.youtube

  const opts = {
    url: urlBase + '?' + querystring.stringify(params),
    headers: {
      'User-Agent': config.apiUserAgent
    },
    json: true,
    timeout: config.apiTimeout
  }

  get.concat(opts, onResponse)

  function onResponse (err, res, data) {
    if (err) return cb(new Error('HTTP request error. ' + err.message))
    if (data.error) {
      return cb(new Error('YouTube API Error. ' + data.error.message))
    }
    cb(null, data)
  }
}
