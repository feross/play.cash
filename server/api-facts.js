module.exports = apiFacts

const debug = require('debug')('play:api-facts')
const sbd = require('sbd')

const config = require('../config')
const secret = require('../secret')
const SongFacts = require('./songfacts')

const songfacts = new SongFacts(secret.songfacts, config.apiUserAgent)

const LINE_BREAK_REGEX = /<br \/>/

/**
 * Search SongFacts. Returns a collection of facts for the given `track` and
 * `artist` query parameters.
 */
function apiFacts (opts, cb) {
  debug('%o', opts)

  songfacts.getFacts(opts, (err, result) => {
    if (err) return cb(err)

    result.facts = result.facts.map(fact => sbd.sentences(fact))
    result.facts = [].concat(...result.facts)

    cb(null, result)
  })
}
