const { combineReducers } = require('redux')
const { reducer: location } = require('./redux-location')

const current = (state = {
  track: 'Stay', // TODO: change to null
  artist: 'Kygo' // TODO: change to null
}, action) => {
  switch (action.type) {
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
  current,
  player,
  location
})

module.exports = rootReducer
