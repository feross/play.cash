const { h, render } = require('preact') /** @jsx h */
const { Provider } = require('preact-redux')

require('preact/devtools') // Excluded in production

const throttle = require('throttleit')

const App = require('./containers/App')
const { playerResize } = require('./actions')
const configureStore = require('./configureStore')
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

function onUrlChange () {
  // const matches = store.url.match(URL_RE)
  // store.current.artist = matches[1]
  // store.current.track = matches[2]
  // update()

  // api.video({
  //   q: `${store.current.artist} ${store.current.track}`,
  //   maxResults: 1
  // }, (err, result) => {
  //   if (err) throw err
  //   console.log(result[0].id)
  //   store.player.videoId = result[0].id
  //   update()
  // })
}
