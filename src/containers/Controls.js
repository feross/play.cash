const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const store = require('../store')
const { formatTime } = require('../format')
const {
  getTrack,
  getArtistForTrack,
  getAlbumForTrack,
  getControlsVisible,
  getCurrentTrack
} = require('../store-getters')

const Album = require('../components/Album')
const Link = require('../components/Link')

class Controls extends Component {
  constructor (props) {
    super(props)

    this.handleClickShuffle = this.handleClickShuffle.bind(this)
    this.handleClickPrevious = this.handleClickPrevious.bind(this)
    this.handleClickPlayPause = this.handleClickPlayPause.bind(this)
    this.handleClickNext = this.handleClickNext.bind(this)
    this.handleClickRepeat = this.handleClickRepeat.bind(this)
    this.handleClickSeek = this.handleClickSeek.bind(this)
  }

  render (props) {
    const { player, playlist } = store
    const currentTrack = getCurrentTrack()

    if (!currentTrack) {
      return null
    }

    const track = getTrack(currentTrack.url)
    const artist = getArtistForTrack(currentTrack.url)
    const album = getAlbumForTrack(currentTrack.url)

    let $nowPlaying = null

    if (track && artist) {
      let $album = null
      if (album) {
        $album = (
          <Album
            class='fl h-100 shadow-2'
            style={{
              width: 56
            }}
            album={album}
            sizeHint='4vw'
            showName={false}
            showArtistName={false}
          />
        )
      }
      $nowPlaying = (
        <div class='cf pv2'>
          {$album}
          <div
            class='fl'
            style={{
              paddingTop: 4,
              paddingLeft: 14,
              width: album ? 'calc(100% - 56px)' : '100%'
            }}
          >
            <div class='truncate pv1'>
              <Link
                class='underline-hover'
                href={track.url}
              >
                {track.name}
              </Link>
            </div>
            <div class='truncate white-70'>
              <Link
                class='underline-hover f7'
                href={artist.url}
              >
                {artist.name}
              </Link>
            </div>
          </div>
        </div>
      )
    }

    const cls = getControlsVisible()
      ? 'animate-slide-in-up animate--fast'
      : 'animate-slide-out-down animate--normal'

    const progress = player.time / (player.duration || Infinity)

    const playPauseIcon = player.playing
      ? 'pause_circle_outline'
      : 'play_circle_outline'

    const iconCls = 'material-icons hover-white grow-large pointer v-top'

    const iconClsEnabled = 'bg-white-20 br-pill pa2'
    const iconClsDisabled = 'ma2'

    const shuffleCls = playlist.shuffle ? iconClsEnabled : iconClsDisabled
    const repeatCls = playlist.repeat ? iconClsEnabled : iconClsDisabled

    return (
      <div
        id='controls'
        class={c('fixed z-2 bottom-0 w-100 shadow-1 ph2 ph3-m ph3-l', cls)}
        style={{
          height: 82,
          paddingTop: 6
        }}
      >
        <div
          class='fl w-20-m w-30-l dn db-m db-l v-mid'
          style={{
            minHeight: 1
          }}
        >
          {$nowPlaying}
        </div>
        <div class='fl w-100 w-60-m w-40-l tc mt2'>
          <div>
            <span class='mr3'>
              <i
                class={c(iconCls, shuffleCls)}
                style={{
                  fontSize: 20
                }}
                onClick={this.handleClickShuffle}
              >
                shuffle
              </i>
            </span>
            <i
              class={c('mh2', iconCls)}
              style={{
                fontSize: 24,
                marginTop: 6
              }}
              onClick={this.handleClickPrevious}
            >
              skip_previous
            </i>
            <i
              class={c('mh2', iconCls)}
              style={{
                fontSize: 42,
                marginTop: -3
              }}
              onClick={this.handleClickPlayPause}
            >
              {playPauseIcon}
            </i>
            <i
              class={c('mh2', iconCls)}
              style={{
                fontSize: 24,
                marginTop: 6
              }}
              onClick={this.handleClickNext}
            >
              skip_next
            </i>
            <span class='ml3'>
              <i
                class={c(iconCls, repeatCls)}
                style={{
                  fontSize: 20
                }}
                onClick={this.handleClickRepeat}
              >
                repeat
              </i>
            </span>
          </div>
          <div
            class='cf w-100'
            style={{
              marginTop: 5
            }}
          >
            <div
              class='fl f7 white-90 pr2 tr'
              style={{
                width: 40
              }}
            >
              {formatTime(player.time)}
            </div>
            <div
              class='fl'
              style={{
                width: 'calc(100% - 80px)',
                paddingTop: 5,
                paddingBottom: 10
              }}
              onClick={this.handleClickSeek}
            >
              <div
                class='bg-white-50 br-pill overflow-hidden'
                style={{
                  height: 4
                }}
              >
                <div
                  class='bg-white br-pill'
                  style={{
                    width: (progress * 100) + '%',
                    height: 4
                  }}
                />
              </div>
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
        <div class='fl w-20-m w-30-l dn db-m db-l v-mid' />
      </div>
    )
  }

  handleClickShuffle () {
    store.dispatch('PLAYLIST_SHUFFLE', !store.playlist.shuffle)
  }

  handleClickPrevious () {
    store.dispatch('PLAYLIST_PREVIOUS')
  }

  handleClickPlayPause (e) {
    const { player } = store
    store.dispatch('PLAYER_PLAYING', !player.playing)
  }

  handleClickNext () {
    store.dispatch('PLAYLIST_NEXT')
  }

  handleClickRepeat () {
    store.dispatch('PLAYLIST_REPEAT', !store.playlist.repeat)
  }

  handleClickSeek (e) {
    const { player } = store
    const progress = e.offsetX / e.currentTarget.offsetWidth
    const time = Math.round(progress * player.duration * 100) / 100
    store.dispatch('PLAYER_SEEK', time)
  }
}

module.exports = Controls
