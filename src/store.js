const api = require('./api')
const debug = require('debug')('play:store')

const store = {
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

store.dispatch = (type, data) => {
  debug('%s %o', type, data)
  switch (type) {
    case 'LOCATION_CHANGE': {
      store.location = data
      return update()
    }

    case 'PLAYER_RESIZE': {
      store.player.width = data.width
      store.player.height = data.height
      return update()
    }

    case 'FETCH_TRACK': {
      const q = data.artist + ' ' + data.track
      api.video({ q, maxResults: 1 }, (err, result) => {
        store.dispatch('FETCH_TRACK_DONE', { err, result })
      })
      return
    }

    case 'FETCH_TRACK_DONE': {
      const { err, result } = data
      if (err) throw err // TODO
      const [video] = result
      if (!video) throw new Error('No track found') // TODO

      store.player.videoId = video.id
      return update()
    }

    case 'FETCH_SEARCH': {
      api.music({ ...data, method: 'search' }, (err, result) => {
        store.dispatch('FETCH_SEARCH_DONE', { err, result })
      })
      return
    }

    case 'FETCH_SEARCH_DONE': {
      const { err, result } = data
      if (err) throw err // TODO
      console.log(result) // TODO
      return update()
    }

    default: {
      throw new Error('Unrecognized dispatch action', type, data)
    }
  }
}

function update () {
  store.onupdate()
}

module.exports = store
