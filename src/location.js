// TODO: publish to npm

const History = require('./history')
const pathToRegexp = require('path-to-regexp')

class Location {
  constructor (routes, onChange) {
    this._routes = routes.map(route => {
      const [name, path] = route
      const keys = []
      const regexp = pathToRegexp(path, keys)
      return { name, path, keys, regexp }
    })
    this._onChange = onChange
    this._onHistoryChange = this._onHistoryChange.bind(this)

    this._history = new History()
    this._history.on('change', this._onHistoryChange)

    // Trigger an initial 'change' event
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

  destroy () {
    this._history.removeListener('change', this._onHistoryChange)
    this._history.destroy()

    this._routes = null
    this._onChange = null
    this._onHistoryChange = null
    this._history = null
  }

  _onHistoryChange (pathname) {
    const loc = this._parse(pathname)
    this._onChange(loc)
  }

  _parse (pathname) {
    const ret = {
      name: null,
      params: {},
      pathname
    }
    for (const route of this._routes) {
      const matches = route.regexp.exec(pathname)
      if (!matches) continue

      // Found a matching route
      ret.name = route.name
      matches.slice(1).forEach((paramValue, paramIndex) => {
        const param = route.keys[paramIndex].name
        // Remove URL encoding from the param values. Accommodates whitespace in both
        // x-www-form-urlencoded and regular percent-encoded form.
        paramValue = decodeURIComponent(paramValue.replace(/\+/g, ' '))
        ret.params[param] = paramValue
      })
      break
    }
    return ret
  }
}

module.exports = Location
