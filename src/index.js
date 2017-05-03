const { h, render } = require('preact') /** @jsx h */

const debug = require('debug')('play')
const loadScript = require('load-script2')

const App = require('./containers/App')
const config = require('../config')
const Location = require('./lib/location')
const routes = require('./routes')
const store = require('./store')

store.update = update

let root = null

const loc = new Location(routes, (loc) => {
  store.dispatch('LOCATION_CHANGE', loc)
})

function update () {
  // debug('update')
  root = render(<App />, document.body, root)
}

/**
 * DEVELOPMENT
 */

window.store = store
window.loc = loc
window.update = update

// Page load speed
console.timeEnd('render')
window.addEventListener('load', () => console.timeEnd('load'))

// React Developer Tools (Excluded in production)
require('preact/devtools')

// Live Reload
if (!config.isProd) {
  navigator.getBattery().then(function (battery) {
    if (battery.charging && window.localStorage.live !== 'false') {
      loadScript('http://livejs.com/live.js', () => debug('Live Reload'))
    } else {
      debug('Live Reload disabled (on battery power, or disabled via `localStorage.live`)')
    }
  })
}
