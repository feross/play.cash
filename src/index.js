const { h, render } = require('preact') /** @jsx h */
const { Provider } = require('preact-redux')

// Preact Dev Tools are excluded in production to reduce bundle size
require('preact/devtools')

const throttle = require('throttleit')

const App = require('./containers/App')
const { playerResize } = require('./actions')
const api = require('./api')
const configureStore = require('./configureStore')
const store = configureStore()

// const URL_RE = /^\/([^/]+)\/([^/]+)/

let root = null
init()

function init () {
  update()
  onUrlChange()
  // if (store.userName) {
  //   socket.init(store.game, update)
  // }
}

function update () {
  const elem = (
    <Provider store={store}>
      <App />
    </Provider>
  )
  root = render(elem, document.body, root)
}

window.addEventListener('resize', throttle(onResize, 250))

function onResize () {
  const width = window.innerWidth
  const height = window.innerHeight
  store.dispatch(playerResize(width, height))
  // update()
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

// function cleanupUrl (url) {
//   return url.replace('%20', '-')
// }

// for debugging
window.api = api
window.store = store
window.update = update
