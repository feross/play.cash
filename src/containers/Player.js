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
    this._onResizeThrottled = throttle(this._onResize.bind(this), 500)
    this._onTimeupdate = this._onTimeupdate.bind(this)
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
      <div id='player' class='fixed z-0 top-0'>
        <YouTubePlayer
          videoId={player.videoId}
          playing={player.playing}
          volume={player.volume}
          playbackRate={player.playbackRate}
          width={player.width}
          height={player.height}
          playerOpts={PLAYER_OPTS}
          onError={this._onError}
          onUnplayable={this._onUnplayable}
          onPlaying={this._onPlaying}
          onPaused={this._onPaused}
          onDuration={this._onDuration}
          onTimeupdate={this._onTimeupdate}
        />
      </div>
    )
  }

  _onResize () {
    const width = window.innerWidth
    const height = window.innerHeight
    store.dispatch('PLAYER_RESIZE', { width, height })
  }

  _onError (err) {
    store.dispatch('PLAYER_ERROR', err)
  }

  _onUnplayable (videoId) {
    store.dispatch('PLAYER_ERROR', new Error('Unplayable video ' + videoId))
  }

  _onPlaying () {
    store.dispatch('PLAYER_PLAYING', true)
  }

  _onPaused () {
    store.dispatch('PLAYER_PLAYING', false)
  }

  _onDuration (duration) {
    store.dispatch('PLAYER_DURATION', duration)
  }

  _onTimeupdate (time) {
    store.dispatch('PLAYER_TIMEUPDATE', time)
  }
}

module.exports = Player
