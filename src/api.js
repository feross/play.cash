const debug = require('debug')('api')
const memo = require('memo-async-lru')
const querystring = require('querystring')

const fetchConcat = require('./lib/simple-fetch')
const config = require('../config')

const MEMO_OPTS = {
  max: 1000,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}

function facts (opts, cb) {
  debug('facts: %o', opts)
  sendRequest('/api/facts', opts, cb)
}

function music (opts, cb) {
  debug('music: %o', opts)
  sendRequest('/api/music', opts, cb)
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

  fetchConcat(opts, onResponse)

  function onResponse (err, res, data) {
    if (err) return cb(new Error('HTTP request error. ' + err.message))
    if (res.statusCode !== 200) {
      return cb(new Error('HTTP Non-200 Response. ' + res.statusCode))
    }
    if (data.error) {
      return cb(new Error('Server API Error. ' + data.error))
    }
    cb(null, data.result)
  }
}

const api = {
  facts: memo(facts, MEMO_OPTS),
  music: memo(music, MEMO_OPTS),
  video: memo(video, MEMO_OPTS)
}

module.exports = api
