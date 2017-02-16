/** @jsx h */
const { h, render } = require('preact')

const App = require('../components/App')
const socket = require('./socket')

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
