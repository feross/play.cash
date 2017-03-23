const History = require('./history')
const pathToRegexp = require('path-to-regexp')

class Location {
  constructor (routes, onChange) {
    this._routes = []
    routes.forEach(route => this._addRoute(route[0], route[1]))

    this._history = new History()
    this._history.on('change', (pathname) => {
      const loc = this._parse(pathname)
      onChange(loc)
    })

    this.replace(window.location.pathname)
  }

  push (pathname) {
    this._history.push(pathname)
  }

  replace (pathname) {
    this._history.replace(pathname)
  }

  go (n) {
    this._history.go(n)
  }

  _addRoute (name, path) {
    const keys = []
    const route = { path, name, keys, regexp: pathToRegexp(path, keys) }
    this._routes.push(route)
  }

  _parse (pathname) {
    for (const route of this._routes) {
      const matches = route.regexp.exec(pathname)
      if (!matches) continue

      const params = {}
      matches.slice(1).forEach((paramValue, paramIndex) => {
        const param = route.keys[paramIndex].name
        params[param] = paramValue
      })

      return {
        name: route.name,
        params
      }
    }
    return {
      name: null,
      params: {}
    }
  }
}

module.exports = Location
