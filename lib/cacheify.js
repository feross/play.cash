module.exports = cacheify

const AsyncLRU = require('async-lru')

/**
 * Wrap a function with a small in-memory LRU cache.
 *
 * The function must have the following prototype:
 *
 *   function(key: Object, fetch: function(err: Error, value: Object))
 *
 * So, if you were to do:
 *
 *   const readFile = cacheify(fs.readFile)
 *   readFile('file.txt', fn)
 *   readFile('file.txt', fn) // <-- this uses the cache
 *
 * The file would only be read from disk once, it's value cached, and returned
 * anytime the first argument is 'file.txt'.
 *
 * Repeated calls to the function with the same first argument will return a
 * cached value, rather than re-fetch the data.
 */
function cacheify (load, opts) {
  opts = Object.assign({
    max: 100,
    maxAge: 60 * 60 * 1000 // 1 hour
  }, opts)

  const cache = new AsyncLRU({
    max: opts.max,
    maxAge: opts.maxAge,
    load: load
  })

  return loadWithCache

  function loadWithCache (key, cb) {
    if (typeof key !== 'string') key.toString = objectToString
    cache.get(key, cb)
  }
}

function objectToString () {
  return JSON.stringify(this)
}
