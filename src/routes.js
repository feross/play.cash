/**
 * List of routes in the app. Specified as [routeName, routePath, isEntity]. The third
 * argument is a boolean describing whether the route is an "entity" with a permalink.
 */

const routes = [
  ['home', '/'],
  ['artist', '/:name', true],
  ['track', '/:artistName/:name', true],
  ['album', '/:artistName/album/:name', true]
]

module.exports = routes
