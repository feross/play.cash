const isProd = typeof window !== 'undefined'
  ? window.location.hostname !== 'localhost'
  : require('pro' + 'cess').env.NODE_ENV === 'production'

/**
 * Is site running in production?
 */
exports.isProd = isProd

/**
 * Name of the site
 */
exports.name = 'Play'

/**
 * Description of the site
 */
exports.description = 'Music lovers, rejoice.'

/**
 * Website hostname + port
 */
exports.host = isProd
  ? 'play.cash'
  : 'localhost:4000'

/**
 * HTTP origin
 */
exports.httpOrigin = (isProd ? 'https' : 'http') + '://' + exports.host

/**
 * Websocket origin
 */
exports.wsOrigin = (isProd ? 'wss' : 'ws') + '://' + exports.host

/**
 * Root path of project
 */
exports.root = __dirname

/**
 * Maximum time to cache static resources (in milliseconds). This value is sent in the HTTP
 * cache-control header.
 */
exports.maxAge = isProd
  ? 7 * 24 * 3600000 // 7 days
  : 0

/**
 * Time to wait in milliseconds before an API request is considered timed out.
 */
exports.apiTimeout = 30 * 1000

/**
 * User agent for API requests
 */
exports.apiUserAgent = 'Play/1.0.0 (https://play.cash)'
