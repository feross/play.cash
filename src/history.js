// TODO: publish to npm

const EventEmitter = require('events')

class History extends EventEmitter {
  constructor () {
    super()
    this._onpopstate = this._onpopstate.bind(this)
    window.addEventListener('popstate', this._onpopstate)
  }

  push (pathname) {
    window.history.pushState(undefined, undefined, pathname)
    this._onpopstate()
  }

  replace (pathname) {
    window.history.replaceState(undefined, undefined, pathname)
    this._onpopstate()
  }

  go (n) {
    window.history.go(n)
  }

  destroy () {
    window.removeEventListener('popstate', this._onpopstate)
    this._onpopstate = null
  }

  _onpopstate (e) {
    this.emit('change', window.location.pathname)
  }
}

module.exports = History
