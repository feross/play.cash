const { combineReducers } = require('redux')
const { reducer: location } = require('./redux-location')

const currentTrack = (state = null, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const tracks = (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_TRACK':
      const track = action.track
      const trackId = track.artist + '~' + track.track
      return {
        ...state,
        [trackId]: {
          isLoading: true
        }
      }
    case 'RECEIVE_TRACK': {
      const track = action.track
      const trackId = track.artist + '~' + track.track
      return {
        ...state,
        [trackId]: {
          isLoading: false,
          videoId: action.videoId
        }
      }
    }
    default:
      return state
  }
}

const player = (state = {
  width: window.innerWidth,
  height: window.innerHeight,
  videoId: 'WUG2guLUtuo', // TODO: change to null
  playing: false, // TODO: change to true
  volume: 0,
  playbackRate: 1
}, action) => {
  switch (action.type) {
    case 'PLAYER_RESIZE':
      return {
        ...state,
        width: action.width,
        height: action.height
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  currentTrack,
  tracks,
  player,
  location
})

module.exports = rootReducer
