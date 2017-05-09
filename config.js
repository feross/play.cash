const isProd = typeof window !== 'undefined'
  ? window.location.hostname !== 'localhost'
  : require('pro' + 'cess').env.NODE_ENV === 'production'

/**
 * Is site running in production?
 */
exports.isProd = isProd

/**
 * Server listening port
 */
exports.port = isProd
  ? 7700
  : 4000

/**
 * Name of the site
 */
exports.name = 'Play'

/**
 * Description of the site
 */
exports.description = 'Next-gen music video player'

/**
 * Website hostname + port
 */
exports.host = isProd
  ? 'play.cash'
  : 'localhost:' + exports.port

/**
 * HTTP origin
 */
exports.httpOrigin = (isProd ? 'https' : 'http') + '://' + exports.hostname

/**
 * Websocket origin
 */
exports.wsOrigin = (isProd ? 'wss' : 'ws') + '://' + exports.hostname

/**
 * Root path of project
 */
exports.root = __dirname

/**
 * Time to wait in milliseconds before an API request is considered timed out.
 */
exports.apiTimeout = 30 * 1000

/**
 * User agent for API requests
 */
exports.apiUserAgent = 'Play/1.0.0 (http://play.cash)'
