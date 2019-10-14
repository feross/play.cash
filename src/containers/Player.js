const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const store = require('../store')

const YouTubePlayer = require('../components/YouTubePlayer')

const PLAYER_OPTS = {
  captions: true,
  controls: false,
  fullscreen: false,
  annotations: false,
  related: false,
  modestBranding: true
}

class Player extends Component {
  constructor (props) {
    super(props)

    this._ref = this._ref.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleUnplayable = this.handleUnplayable.bind(this)
    this.handleEnded = this.handleEnded.bind(this)
    this.handlePlaying = this.handlePlaying.bind(this)
    this.handlePaused = this.handlePaused.bind(this)
    this.handleBuffering = this.handleBuffering.bind(this)
    this.handleDuration = this.handleDuration.bind(this)
    this.handleTimeupdate = this.handleTimeupdate.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  render (props) {
    const { app, player, playlist } = store

    const loadingCls = (player.fetchingTrack || playlist.tracks.length === 0 ||
        (player.buffering && !player.seeking))
      ? 'animate-fade-in animate--fast'
      : 'animate-fade-out animate--fast'

    return (
      <div class='fixed absolute--fill ' style={{ zIndex: -1 }}>
        <div
          id='player'
          class='absolute top-0 w-100 vh-100'
          onClick={this.handleClick}
        >
          <YouTubePlayer
            ref={this._ref}
            videoId={player.videoId}
            playing={player.playing}
            volume={player.volume}
            playbackRate={player.playbackRate}
            width={app.width}
            height={app.height}
            playerOpts={PLAYER_OPTS}
            onError={this.handleError}
            onUnplayable={this.handleUnplayable}
            onEnded={this.handleEnded}
            onPlaying={this.handlePlaying}
            onPaused={this.handlePaused}
            onBuffering={this.handleBuffering}
            onDuration={this.handleDuration}
            onTimeupdate={this.handleTimeupdate}
            style={{
              pointerEvents: 'none'
            }}
          />
        </div>
        <video
          class={c('absolute top-0 vh-100', loadingCls)}
          style={{
            pointerEvents: 'none',
            width: '177.77777778vh', /* 100 * 16 / 9 */
            minWidth: '100%',
            minHeight: '56.25vw' /* 100 * 9 / 16 */
          }}
          playbackRate={0.4}
          autoplay
          loop
          playsinline
          muted
        >
          <source src='/glitch.webm' type='video/webm; codecs=vp9' />
          <source src='/glitch.mp4' type='video/mp4' />
        </video>
      </div>
    )
  }

  _ref (elem) {
    // Expose player instance as global variable so seek(), etc. can be called
    Object.defineProperty(window, 'player', {
      get () {
        return elem.player
      }
    })
  }

  handleError (err) {
    store.dispatch('PLAYER_ERROR', err)
  }

  handleUnplayable (videoId) {
    store.dispatch('PLAYER_ERROR', new Error('Unplayable video ' + videoId))
  }

  handleEnded () {
    store.dispatch('PLAYER_ENDED')
  }

  handlePlaying () {
    const { player } = store
    if (!player.playing) store.dispatch('PLAYER_PLAYING', true)
  }

  handlePaused () {
    const { player } = store
    if (player.playing) store.dispatch('PLAYER_PLAYING', false)
  }

  handleBuffering () {
    store.dispatch('PLAYER_BUFFERING')
  }

  handleDuration (duration) {
    store.dispatch('PLAYER_DURATION', duration)
  }

  handleTimeupdate (time) {
    store.dispatch('PLAYER_TIMEUPDATE', time)
  }

  handleClick () {
    const { player } = store
    store.dispatch('PLAYER_PLAYING', !player.playing)
  }
}

module.exports = Player
