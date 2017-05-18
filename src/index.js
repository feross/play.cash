const { h, render } = require('preact') /** @jsx h */

const App = require('./containers/App')
const Location = require('./lib/location')
const routes = require('./routes')
const store = require('./store')

store.update = update

let root = null

const loc = new Location(routes, (loc, source) => {
  store.dispatch('LOCATION_CHANGE', loc)
  if (source === 'push') window.scroll(0, 0)
  window.ga('send', 'pageview', loc.pathname)
})

// Global variables
window.loc = loc
window.player = null

function update () {
  root = render(<App />, document.body, root)
}

/**
 * DEVELOPMENT
 */

// Debugging aid
window.store = store
window.update = update

// Measure page speed
console.timeEnd('render')
window.addEventListener('load', () => console.timeEnd('load'))

// React Developer Tools (Excluded in production)
require('preact/devtools')
