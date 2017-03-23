const api = require('./api')

module.exports = {
  playerResize,
  fetchTrack
}

function playerResize (width, height) {
  return {
    type: 'PLAYER_RESIZE',
    width,
    height
  }
}

function requestTrack (track) {
  return {
    type: 'REQUEST_TRACK',
    track
  }
}

function receiveTrack (track, videoId) {
  return {
    type: 'RECEIVE_TRACK',
    track,
    videoId
  }
}

function fetchTrack (track) {
  return (dispatch) => {
    dispatch(requestTrack(track))
    api.video({
      q: track.artist + ' ' + track.track,
      maxResults: 1
    }, (err, result) => {
      if (err) throw err
      const videoId = result[0].id
      dispatch(receiveTrack(track, videoId))
    })
  }
}

// function fetchTrackIfNeeded (track) {
//   return (dispatch, getState) => {
//     if (shouldFetchTrack(getState()))
//   }
// }
