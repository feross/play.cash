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
      location.name !== 'track'

    const cls = showControls
      ? 'animate animate--slide-in-up'
      : 'animate animate--slide-out-down'

    const progress = store.time / store.duration

    return (
      <div
        id='controls'
        class={c('fixed z-2 bottom-0 w-100 shadow-1 ph2 ph3-m ph4-l', cls)}
        style={{
          height: 80,
          paddingTop: 8
        }}
      >
        <div class='fl w-third v-mid'>
          Info
        </div>
        <div class='fl w-third v-mid tc'>
          <div>
            <i
              class='material-icons ph2'
              style={{
                fontSize: 26
              }}
            >
              skip_previous
            </i>
            <i
              class='material-icons ph2'
              style={{
                fontSize: 44
              }}
              onClick={this._onPlayPause}
            >
              play_circle_outline
            </i>
            <i
              class='material-icons ph2'
              style={{
                fontSize: 26
              }}
            >
              skip_next
            </i>
          </div>
          <div class='cf v-mid'>
            <div
              class='fl f7'
              style={{
                width: 40
              }}
            >
              {formatTime(player.time)}
            </div>
            <div class='fl w-100 bg-white h1'>
              <div
                style={{
                  width: (progress * 100) + '%'
                }}
              />
            </div>
            <div class='fl f7'>
              {formatTime(player.duration)}
            </div>
          </div>
        </div>
        <div class='fl w-third v-mid' />
      </div>
    )
  }

  _onPlayPause (e) {
    const { player } = store
    store.dispatch('PLAYER_PLAYING', !player.playing)
  }
}

module.exports = Controls
