const memo = require('memo-async-lru')

const apiFacts = require('./api-facts')
const apiMusic = require('./api-music')
const apiVideo = require('./api-video')

const MEMO_OPTS = {
  max: 50 * 1000,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}

const api = {
  facts: memo(apiFacts, MEMO_OPTS),
  music: memo(apiMusic, MEMO_OPTS),
  video: memo(apiVideo, MEMO_OPTS)
}

module.exports = api
