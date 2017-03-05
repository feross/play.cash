module.exports = {
  url: decodeURIComponent(window.location.pathname),

  current: {
    track: null,
    artist: null
  },

  player: {
    width: window.innerWidth,
    height: window.innerHeight,
    videoId: null,
    playing: false,
    volume: 0,
    playbackRate: 1
  }
}
