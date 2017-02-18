/** @jsx h */
const { h, render } = require('preact')

const App = require('../components/App')
const socket = require('./socket')

// const api = require('./api')
const Player = require('yt-player')

const player = new Player('#player')
window.player = player

player.load('GKSRyLdjsPA')

player.on('playing', () => {
  player.pause()
})

// api.search({ q: 'poison alice cooper' }, (err, result) => {
//   if (err) throw err
//   const id = result[0].id
//   const player = new Player('#player')
//   player.load(id)
// })

// Enable React Dev Tools (only in development to reduce bundle size)
// require('preact/devtools')

const state = window.state = {
  url: window.location.pathname,
  player: {
    videoId: null
  },
  playlist: [
    { title: '', artist: '', album: '' }
  ]
}

init()

let root
function update () {
  root = render(<App state={state} />, document.body, root)
}

function init () {
  // Allow server to set initial state
  Object.assign(state, window.initialState)
  update()
  if (state.userName) {
    socket.init(state.game, update)
  }
}
