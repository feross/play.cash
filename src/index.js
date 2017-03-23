const { h, render } = require('preact') /** @jsx h */
const throttle = require('throttleit')

require('preact/devtools') // Excluded in production

const App = require('./containers/App')
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

window.addEventListener('resize', throttle(onResize, 250))

function update () {
  root = render(<App />, document.body, root)
}

function onResize () {
  const width = window.innerWidth
  const height = window.innerHeight
  store.dispatch('PLAYER_RESIZE', { width, height })
}

window.loc = loc
window.store = store
