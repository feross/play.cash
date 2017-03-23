const EventEmitter = require('events')
const History = require('./history')
const pathToRegexp = require('path-to-regexp')

const locationChangeAction = (pathname) => ({
  type: 'LOCATION_CHANGE',
  pathname
})

class ReduxLocation extends EventEmitter {
  constructor () {
    super()

    this._routes = []

    this._history = new History()
    this._history.on('change', (pathname) => {
      this.emit('dispatch', locationChangeAction(pathname))
    })

    this.reducer = this.reducer.bind(this)
  }

  addRoute (path, name) {
    const keys = []
    const route = { path, name, keys, regexp: pathToRegexp(path, keys) }
    this._routes.push(route)
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

  reducer (state = null, action) {
    switch (action.type) {
      case 'LOCATION_CHANGE':
        for (const route of this._routes) {
          const matches = route.regexp.exec(action.pathname)
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
        return null
      default:
        return state
    }
  }
}

module.exports = new ReduxLocation()
