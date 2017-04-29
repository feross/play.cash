const memo = require('memo-async-lru')

const apiFacts = require('./api-facts')
const apiMusic = require('./api-music')
const apiVideo = require('./api-video')

const MEMO_OPTS = {
  max: 10 * 1000,
  maxAge: 6 * 60 * 60 * 1000 // 6 hours
}

const api = {
  facts: memo(apiFacts, MEMO_OPTS),
  music: memo(apiMusic, MEMO_OPTS),
  video: memo(apiVideo, MEMO_OPTS)
}

module.exports = api
