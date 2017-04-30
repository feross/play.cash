const api = require('./api')
const debug = require('debug')('play:store')
const EventEmitter = require('events')

const store = new EventEmitter()

const defaultStore = {
  location: {
    name: null,
    params: {}
  },
  player: {
    width: 0,
    height: 0,
    videoId: null,
    playing: false,
    volume: 100,
    playbackRate: 1
  },
  currentTrack: null,
  tracks: {}
}

Object.assign(store, defaultStore)

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
    case 'FETCH_TRACK':
      api.video({
        q: data.artist + ' ' + data.track,
        maxResults: 1
      }, (err, result) => {
        if (err) throw err // TODO
        const video = result[0]
        if (!video) throw err // TODO
        store.player.videoId = video.id
        update()
      })
      break
    default:
      throw new Error('Unrecognized dispatch action', type, data)
  }
  update()
}

function update () {
  store.emit('update')
}

module.exports = store
