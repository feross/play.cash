// React Developer Tools (Excluded in production)
if (process.env.NODE_ENV !== 'production') require('preact/debug')

const { h, render } = require('preact') /** @jsx h */

const App = require('./containers/App')
const Location = require('./lib/location')
const routes = require('./routes')
const store = require('./store')

store.update = update

const root = document.body

const loc = new Location(routes, (location, source) => {
  store.dispatch('LOCATION_CHANGE', location)
  if (source === 'push') window.scroll(0, 0)
})

// Global variables
window.loc = loc
window.player = null

function update () {
  render(<App />, root)
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
