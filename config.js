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
  ? 7600
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
  ? 'play.one'
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
