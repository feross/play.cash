const memo = require('memo-async-lru')

const apiFacts = require('./api-facts')
const apiSearch = require('./api-search')
const apiVideo = require('./api-video')

const MEMO_OPTS = {
  max: 10 * 1000,
  maxAge: 6 * 60 * 60 * 1000 // 6 hours
}

const api = {
  facts: memo(apiFacts, MEMO_OPTS),
  search: memo(apiSearch, MEMO_OPTS),
  video: memo(apiVideo, MEMO_OPTS)
}

module.exports = api
