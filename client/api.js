const memo = require('memo-async-lru')

module.exports = {
  search: memo(search)
}

const debug = require('debug')('play:api')
const get = require('simple-get')
const querystring = require('querystring')

const config = require('../config')

/**
 * Search YouTube. Returns a collection of search results that match the query
 * parameters.
 */
function search (opts, cb) {
  debug('search: %o', opts)
  const url = '/api/search'
  sendRequest(url, opts, cb)
}

function sendRequest (urlBase, params, cb) {
  const opts = {
    url: urlBase + '?' + querystring.stringify(params),
    timeout: config.apiTimeout
  }

  get.concat(opts, onResponse)

  function onResponse (err, res, data) {
    if (err) return cb(new Error('HTTP request error. ' + err.message))
    try {
      data = JSON.parse(data)
    } catch (err) {
      return cb(new Error('Invalid JSON in response. ' + err.message))
    }
    if (data.error) {
      return cb(new Error('Server API Error. ' + data.error))
    }
    cb(null, data.result)
  }
}
