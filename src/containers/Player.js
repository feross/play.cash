const { Component, h } = require('preact') /** @jsx h */
const throttle = require('throttleit')

const store = require('../store')

const YouTubePlayer = require('../components/YouTubePlayer')

const PLAYER_OPTS = {
  captions: true,
  controls: false,
  fullscreen: false,
  annotations: false,
  related: false,
  info: false,
  modestBranding: true
}

class Player extends Component {
  constructor (props) {
    super(props)
    this._onResizeThrottled = throttle(this._onResize.bind(this), 250)
  }

  componentWillMount () {
    this._onResize()
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResizeThrottled)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._onResizeThrottled)
  }

  render (props) {
    const { player } = store
    return (
      <div id='player' class='fixed top-0'>
        <YouTubePlayer
          videoId={player.videoId}
          playing={player.playing}
          volume={player.volume}
          playbackRate={player.playbackRate}
          width={player.width}
          height={player.height}
          playerOpts={PLAYER_OPTS}
          onError={() => console.log('onError')}
          onUnplayable={() => console.log('onUnplayable')}
          onPlaying={() => console.log('onPlaying')}
          onPaused={() => console.log('onPaused')}
          onDuration={() => console.log('onDuration')}
          onTimeupdate={() => console.log('onTimeupdate')}
        />
      </div>
    )
  }

  _onResize () {
    const width = window.innerWidth
    const height = window.innerHeight
    store.dispatch('PLAYER_RESIZE', { width, height })
  }
}

module.exports = Player
