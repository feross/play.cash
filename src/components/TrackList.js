const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Link = require('./Link')

const TrackList = (props) => {
  const {
    tracks,
    showArtistName = true
  } = props

  const $tracks = tracks.map((track, i) => {
    let $artistName = null
    if (showArtistName) {
      $artistName = (
        <div class='white-40 mt1' style={{
          marginLeft: '3rem'
        }}>
          {track.artistName}
        </div>
      )
    }

    return (
      <Link
        class='track db pa3 truncate color-inherit hover-bg-black-50 bg-animate'
        href={track.url}
        color='inherit'
      >
        <div
          class='fl tr'
          style={{
            width: 20
          }}
        >
          <i
            class='play-arrow material-icons absolute mr1 dn'
            style={{
              fontSize: 28,
              marginTop: '-0.15rem',
              marginLeft: '-0.3rem'
            }}
          >
            play_arrow
          </i>
          <div class='track-num mt1 white-40'>{i + 1}.</div>
        </div>
        <div
          class='f4'
          style={{
            marginLeft: '3rem'
          }}
        >
          {track.name}
        </div>
        {$artistName}
      </Link>
    )
  })

  return (
    <div class={c('db fw3', props.class)}>
      {$tracks}
    </div>
  )
}

module.exports = TrackList
