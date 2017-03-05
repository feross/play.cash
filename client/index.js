const { h, render } = require('preact') /** @jsx h */

const throttle = require('throttleit')

// Enable React Dev Tools (only in development to reduce bundle size)
// require('preact/devtools')

const api = require('./api')
// const socket = require('./socket')
const store = require('./store')

const App = require('../components/App')

const URL_RE = /^\/([^/]+)\/([^/]+)/

let root = null
init()

function init () {
  Object.assign(store, window.initialStore) // Server can set initial store
  onUrlChange()
  // if (store.userName) {
  //   socket.init(store.game, update)
  // }
}

function update () {
  root = render(<App store={store} />, document.body, root)
}

window.addEventListener('resize', throttle(onResize, 250))

function onResize () {
  store.player.width = window.innerWidth
  store.player.height = window.innerHeight
  update()
}

function onUrlChange () {
  const matches = store.url.match(URL_RE)
  store.current.artist = matches[1]
  store.current.track = matches[2]
  update()

  api.video({
    q: `${store.current.artist} ${store.current.track}`,
    maxResults: 1
  }, (err, result) => {
    if (err) throw err
    store.player.videoId = result[0].id
    update()
  })
}

// function cleanupUrl (url) {
//   return url.replace('%20', '-')
// }

// for debugging
window.api = api
window.store = store
window.update = update
