const { h, render } = require('preact') /** @jsx h */
const throttle = require('throttleit')

const App = require('./containers/App')
const config = require('../config')
const debug = require('debug')('play')
const loadScript = require('load-script2')
const Location = require('./location')
const store = require('./store')

let root = null

const routes = [
  ['home', '/'],
  ['track', '/:artist/:track'],
  ['about', '/about']
]

const loc = new Location(routes, (loc) => {
  store.dispatch('LOCATION_CHANGE', loc)
})

update()
store.on('update', update)

onResize()
window.addEventListener('resize', throttle(onResize, 250))

function update () {
  root = render(<App />, document.body, root)
}

function onResize () {
  const width = window.innerWidth
  const height = window.innerHeight
  store.dispatch('PLAYER_RESIZE', { width, height })
}

/** DEVELOPMENT */

window.loc = loc
window.store = store

// React Developer Tools (Excluded in production)
require('preact/devtools')

// Live Reload (Excluded in production)
if (!config.isProd) {
  navigator.getBattery().then(function (battery) {
    if (battery.charging) {
      loadScript('http://livejs.com/live.js', () => debug('Live Reload enabled'))
    } else {
      debug('Live Reload disabled (on battery power)')
    }
  })
}
