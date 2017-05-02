/**
 * List of routes in the app. Specified as [routeName, routePath, isEntity]. The third
 * argument is a boolean describing whether the route is an "entity" with a permalink.
 */

const routes = [
  ['home', '/'],
  ['track', '/:artist/:name', true]
]

module.exports = routes
