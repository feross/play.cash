const { h, render } = require('preact') /** @jsx h */

const Player = require('yt-player')

const api = require('./api')
const App = require('../components/App')
// const socket = require('./socket')

const URL_RE = /^\/([^/]+)\/([^/]+)/

const player = new Player('#player', {
  width: window.innerWidth || 1440,
  height: window.innerHeight || 900,
  autoplay: true,
  captions: true,
  controls: false,
  fullscreen: false,
  annotations: false,
  modestBranding: true,
  related: false,
  info: false
})
window.player = player

// Enable React Dev Tools (only in development to reduce bundle size)
// require('preact/devtools')

const state = {
  url: decodeURIComponent(window.location.pathname),
  player: {
    title: null,
    artist: null,
    videoId: null
  }
}
window.state = state

let root = null
init()

function init () {
  Object.assign(state, window.initialState) // Server can set initial state
  update()
  onUrlChange()
  // if (state.userName) {
  //   socket.init(state.game, update)
  // }
}

function update () {
  root = render(<App state={state} />, document.body, root)
}

function onUrlChange () {
  const matches = state.url.match(URL_RE)
  state.artist = matches[1]
  state.title = matches[2]
  update()

  api.search({
    q: `${state.artist} ${state.title}`,
    maxResults: 1
  }, (err, result) => {
    if (err) throw err
    state.player.videoId = result[0].id
    player.load(state.player.videoId)

    player.once('playing', () => {
      setTimeout(() => player.pause(), 5000)
    })

    player.on('timeupdate', (time) => {
      console.log(time)
    })
  })
}

function cleanupUrl (url) {
  return url.replace('%20', '-')
}
