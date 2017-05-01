// TODO: publish to npm

const EventEmitter = require('events')

class History extends EventEmitter {
  constructor () {
    super()
    this._onChange = this._onChange.bind(this)
    window.addEventListener('popstate', this._onChange)
  }

  push (pathname) {
    window.history.pushState(undefined, undefined, pathname)
    this._onChange()
  }

  replace (pathname) {
    window.history.replaceState(undefined, undefined, pathname)
    this._onChange()
  }

  go (n) {
    window.history.go(n)
  }

  destroy () {
    window.removeEventListener('popstate', this._onChange)
    this._onChange = null
  }

  _onChange (e) {
    this.emit('change', window.location.pathname)
  }
}

module.exports = History
