const { Component, h } = require('preact') /** @jsx h */

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
    this._onEnded = this._onEnded.bind(this)
    this._onTimeupdate = this._onTimeupdate.bind(this)
    this._onBuffering = this._onBuffering.bind(this)
  }

  render (props) {
    const { app, player } = store

    let $loadingVideo = null
    if (player.buffering) {
      $loadingVideo = (
        <video
          class='absolute top-0 vh-100 animate-fade-in'
          style={{
            width: '177.77777778vh', /* 100 * 16 / 9 */
            minWidth: '100%',
            minHeight: '56.25vw' /* 100 * 9 / 16 */
          }}
          playbackRate={0.4}
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
      <div class='fixed absolute--fill ' style={{ 'z-index': -1 }}>
        <div id='player' class='absolute top-0 w-100 vh-100'>
          <YouTubePlayer
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
          />
        </div>
        {$loadingVideo}
      </div>
    )
  }

  _onError (err) {
    store.dispatch('PLAYER_ERROR', err)
  }

  _onUnplayable (videoId) {
    store.dispatch('PLAYER_ERROR', new Error('Unplayable video ' + videoId))
  }

  // TODO
  _onEnded () {
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
