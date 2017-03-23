const debug = require('debug')('play:store')
const EventEmitter = require('events')

const store = new EventEmitter()

Object.assign(store, {
  location: {
    name: null,
    params: {}
  },
  player: {
    width: window.innerWidth,
    height: window.innerHeight,
    videoId: 'WUG2guLUtuo', // TODO: change to null
    playing: false, // TODO: change to true
    volume: 0,
    playbackRate: 1
  },
  currentTrack: null,
  tracks: {}
})

store.dispatch = (type, data) => {
  debug('%s %o', type, data)
  switch (type) {
    case 'LOCATION_CHANGE':
      store.location = data
      break
    case 'PLAYER_RESIZE':
      store.player.width = data.width
      store.player.height = data.height
      break
    default:
      throw new Error('Unrecognized dispatch action', type, data)
  }
  store.emit('update')
}

module.exports = store
