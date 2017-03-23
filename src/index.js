const { h, render } = require('preact') /** @jsx h */
const { Provider } = require('preact-redux')

require('preact/devtools') // Excluded in production

const throttle = require('throttleit')

const App = require('./containers/App')
const { playerResize } = require('./actions')
const configureStore = require('./configure-store')
const loc = require('./redux-location')

const store = window.store = configureStore()

loc.addRoute('/', 'home')
loc.addRoute('/:artist/:track', 'track')
loc.addRoute('/about', 'about')

loc.on('dispatch', (action) => store.dispatch(action))
loc.replace(window.location.pathname)

window.addEventListener('resize', throttle(onResize, 250))

let root = null
update()

function update () {
  const elem = (
    <Provider store={store}>
      <App />
    </Provider>
  )
  root = render(elem, document.body, root)
}

function onResize () {
  const width = window.innerWidth
  const height = window.innerHeight
  store.dispatch(playerResize(width, height))
}
