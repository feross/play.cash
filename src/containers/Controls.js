const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const store = require('../store')

const { formatTime } = require('../format')

class Controls extends Component {
  constructor (props) {
    super(props)

    this._onPlayPause = this._onPlayPause.bind(this)
  }

  render (props) {
    const { app, location, player } = store

    const showControls = !app.idle || !player.playing || player.buffering ||
      player.fetchingTrack || location.name !== 'track'

    const cls = showControls
      ? 'animate-slide-in-up animate--fast'
      : 'animate-slide-out-down animate--normal'

    const progress = player.time / player.duration

    const playPauseIcon = player.playing
      ? 'pause_circle_outline'
      : 'play_circle_outline'

    return (
      <div
        id='controls'
        class={c('fixed z-2 bottom-0 w-100 shadow-1 ph2 ph3-m ph4-l', cls)}
        style={{
          height: 80,
          paddingTop: 8
        }}
      >
        <div class='fl w-30 v-mid'>
          Info
        </div>
        <div class='fl w-40 tc'>
          <div>
            <i
              class='material-icons pointer v-top mh2'
              style={{
                fontSize: 24,
                marginTop: 9
              }}
            >
              skip_previous
            </i>
            <i
              class='material-icons pointer grow v-top mh2'
              style={{
                fontSize: 42
              }}
              onClick={this._onPlayPause}
            >
              {playPauseIcon}
            </i>
            <i
              class='material-icons pointer v-top mh2'
              style={{
                fontSize: 24,
                marginTop: 9
              }}
            >
              skip_next
            </i>
          </div>
          <div class='cf w-100 mt1'>
            <div
              class='fl f7 pr2 tr'
              style={{
                width: 40
              }}
            >
              {formatTime(player.time)}
            </div>
            <div
              class='fl bg-white br-pill mt1'
              style={{
                width: 'calc(100% - 80px)',
                height: 4
              }}
            >
              <div
                style={{
                  width: (progress * 100) + '%'
                }}
              />
            </div>
            <div
              class='fl f7 pl2 tl'
              style={{
                width: 40
              }}
            >
              {formatTime(player.duration)}
            </div>
          </div>
        </div>
        <div class='fl w-30 v-mid' />
      </div>
    )
  }

  _onPlayPause (e) {
    const { player } = store
    store.dispatch('PLAYER_PLAYING', !player.playing)
  }
}

module.exports = Controls
