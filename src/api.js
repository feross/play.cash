const debug = require('debug')('play:api')
const get = require('simple-get')
const memo = require('memo-async-lru')
const querystring = require('querystring')

const config = require('../config')

function facts (opts, cb) {
  debug('facts: %o', opts)
  sendRequest('/api/facts', opts, cb)
}

function search (opts, cb) {
  debug('search: %o', opts)
  sendRequest('/api/search', opts, cb)
}

function video (opts, cb) {
  debug('video: %o', opts)
  sendRequest('/api/video', opts, cb)
}

function sendRequest (urlBase, params, cb) {
  const opts = {
    url: urlBase + '?' + querystring.stringify(params),
    json: true,
    timeout: config.apiTimeout
  }

  get.concat(opts, onResponse)

  function onResponse (err, res, data) {
    if (err) return cb(new Error('HTTP request error. ' + err.message))
    if (data.error) {
      return cb(new Error('Server API Error. ' + data.error))
    }
    cb(null, data.result)
  }
}

const api = {
  facts: memo(facts),
  search: memo(search),
  video: memo(video)
}

module.exports = api
window.api = api
