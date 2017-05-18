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
  info: false,
  modestBranding: true
}

class Player extends Component {
  constructor (props) {
    super(props)

    this._ref = this._ref.bind(this)
    this._onError = this._onError.bind(this)
    this._onUnplayable = this._onUnplayable.bind(this)
    this._onEnded = this._onEnded.bind(this)
    this._onPlaying = this._onPlaying.bind(this)
    this._onPaused = this._onPaused.bind(this)
    this._onBuffering = this._onBuffering.bind(this)
    this._onDuration = this._onDuration.bind(this)
    this._onTimeupdate = this._onTimeupdate.bind(this)
    this._onClick = this._onClick.bind(this)
  }

  render (props) {
    const { app, player, playlist } = store

    const loadingCls = (player.fetchingTrack ||
        (player.buffering && !player.seeking && playlist.tracks.length === 0))
      ? 'animate-fade-in animate--fast'
      : 'animate-fade-out animate--fast'

    return (
      <div class='fixed absolute--fill ' style={{ zIndex: -1 }}>
        <div
          id='player'
          class='absolute top-0 w-100 vh-100'
          onClick={this._onClick}
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
            onError={this._onError}
            onUnplayable={this._onUnplayable}
            onEnded={this._onEnded}
            onPlaying={this._onPlaying}
            onPaused={this._onPaused}
            onBuffering={this._onBuffering}
            onDuration={this._onDuration}
            onTimeupdate={this._onTimeupdate}
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
    window.player = elem.player
  }

  _onError (err) {
    store.dispatch('PLAYER_ERROR', err)
  }

  _onUnplayable (videoId) {
    store.dispatch('PLAYER_ERROR', new Error('Unplayable video ' + videoId))
  }

  _onEnded () {
    store.dispatch('PLAYER_ENDED')
  }

  _onPlaying () {
    const { player } = store
    if (!player.playing) store.dispatch('PLAYER_PLAYING', true)
  }

  _onPaused () {
    const { player } = store
    if (player.playing) store.dispatch('PLAYER_PLAYING', false)
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

  _onClick () {
    const { player } = store
    store.dispatch('PLAYER_PLAYING', !player.playing)
  }
}

module.exports = Player
