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
    this._onEnded = this._onEnded.bind(this)
    this._onTimeupdate = this._onTimeupdate.bind(this)
    this._onBuffering = this._onBuffering.bind(this)
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

    let $loadingVideo = null
    if (player.buffering) {
      $loadingVideo = (
        <video
          class='z-0 h-100'
          style={{
            opacity: 0.5,
            width: '177.77777778vh', /* 100 * 16 / 9 */
            minWidth: '100%',
            minHeight: '56.25vw' /* 100 * 9 / 16 */
          }}
          autoplay
          loop
          volume='0'
        >
          <source src='/glitch.webm' type='video/webm; codecs=vp9' />
          <source src='/glitch.mp4' type='video/mp4' />
        </video>
      )
    }

    return (
      <div id='player' class='fixed w-100 vh-100 top-0'>
        {$loadingVideo}
        <YouTubePlayer
          class='z-1'
          videoId={player.videoId}
          playing={player.playing}
          volume={player.volume}
          playbackRate={player.playbackRate}
          width={player.width}
          height={player.height}
          playerOpts={PLAYER_OPTS}
          onError={this._onError}
          onUnplayable={this._onUnplayable}
          onEnded={this._onEnded}
          onPlaying={this._onPlaying}
          onPaused={this._onPaused}
          onBuffering={this._onBuffering}
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

  _onEnded () {
    console.log('TODO: handle player ended')
  }

  _onPlaying () {
    store.dispatch('PLAYER_PLAYING', true)
  }

  _onPaused () {
    store.dispatch('PLAYER_PLAYING', false)
  }

  _onBuffering () {
    store.dispatch('PLAYER_BUFFERING')
  }

  _onDuration (duration) {
    store.dispatch('PLAYER_DURATION', duration)
  }

  _onTimeupdate (time) {
    store.dispatch('PLAYER_TIMEUPDATE', time)
  }
}

module.exports = Player
