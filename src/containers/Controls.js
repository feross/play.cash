const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const store = require('../store')

const { formatTime } = require('../format')

class Controls extends Component {
  constructor (props) {
    super(props)

    this._onClickShuffle = this._onClickShuffle.bind(this)
    this._onClickPrevious = this._onClickPrevious.bind(this)
    this._onClickPlayPause = this._onClickPlayPause.bind(this)
    this._onClickNext = this._onClickNext.bind(this)
    this._onClickRepeat = this._onClickRepeat.bind(this)
    this._onClickSeek = this._onClickSeek.bind(this)
  }

  render (props) {
    const { app, location, player } = store

    const showControls = !app.idle || !player.playing || player.buffering ||
      player.fetchingTrack || location.name !== 'track'

    const cls = showControls
      ? 'animate-slide-in-up animate--fast'
      : 'animate-slide-out-down animate--normal'

    const progress = player.time / (player.duration || Infinity)

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
              class='material-icons white-90 hover-white pointer v-top ml2 mr3'
              style={{
                fontSize: 20,
                marginTop: 11
              }}
              onClick={this._onClickShuffle}
            >
              shuffle
            </i>
            <i
              class='material-icons white-90 hover-white pointer v-top ml3 mr2'
              style={{
                fontSize: 24,
                marginTop: 9
              }}
              onClick={this._onClickPrevious}
            >
              skip_previous
            </i>
            <i
              class='material-icons white-90 hover-white pointer v-top mh2 grow'
              style={{
                fontSize: 42
              }}
              onClick={this._onClickPlayPause}
            >
              {playPauseIcon}
            </i>
            <i
              class='material-icons white-90 hover-white pointer v-top ml2 mr3'
              style={{
                fontSize: 24,
                marginTop: 9
              }}
              onClick={this._onClickNext}
            >
              skip_next
            </i>
            <i
              class='material-icons white-90 hover-white pointer v-top ml3 mr2'
              style={{
                fontSize: 20,
                marginTop: 11
              }}
              onClick={this._onClickRepeat}
            >
              repeat
            </i>
          </div>
          <div class='cf w-100 mt1'>
            <div
              class='fl f7 white-90 pr2 tr'
              style={{
                width: 40
              }}
            >
              {formatTime(player.time)}
            </div>
            <div
              class='fl bg-white-50 br-pill mt1 overflow-hidden'
              style={{
                width: 'calc(100% - 80px)',
                height: 4
              }}
              onClick={this._onClickSeek}
            >
              <div
                class='bg-white br-pill'
                style={{
                  width: (progress * 100) + '%',
                  height: 4
                }}
              />
            </div>
            <div
              class='fl f7 white-90 pl2 tl'
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

  _onClickShuffle () {
    window.alert('TODO')
  }

  _onClickPrevious () {
    window.alert('TODO')
  }

  _onClickPlayPause (e) {
    const { player } = store
    store.dispatch('PLAYER_PLAYING', !player.playing)
  }

  _onClickNext () {
    window.alert('TODO')
  }

  _onClickRepeat () {
    window.alert('TODO')
  }

  _onClickSeek (e) {
    console.log(e.offsetX)
    console.log(e.target.offsetWidth)
  }
}

module.exports = Controls
