const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const { getArtistByName } = require('../store-getters')
const { formatTime } = require('../format')

const Link = require('./Link')

const TrackList = (props) => {
  const {
    tracks,
    showArtistName = true,
    columns = 1
  } = props

  const $tracks = tracks.map((track, i) => {
    let $artistName = null
    let $duration = null

    if (showArtistName) {
      const artist = getArtistByName(track.artistName)
      $artistName = (
        <div class='dib white-50'>
          <Link
            class='db mt1 nb1 truncate'
            href={artist.url}
            style={{
              marginLeft: '3rem'
            }}
          >
            {artist.name}
          </Link>
        </div>
      )
    }

    if (track.duration) {
      const duration = formatTime(track.duration)
      $duration = (
        <div class='fr white-50 mt1 tracked fw1'>
          {duration}
        </div>
      )
    }

    return (
      <Link
        class='cf track db pa3 color-inherit hover-bg-black-50 bg-animate'
        href={track.url}
      >
        <i
          class='fl play-arrow material-icons absolute mr1 dn'
          style={{
            fontSize: 28,
            width: 22,
            marginTop: '-0.12rem',
            marginLeft: '-0.15rem'
          }}
        >
          play_arrow
        </i>
        <div
          class='fl absolute track-num mt1 white-50 tr'
          style={{
            width: 22
          }}
        >
          {i + 1}.
        </div>
        <div class='fl w-100'>
          <div
            class='f4 truncate'
            style={{
              marginLeft: '3rem'
            }}
          >
            {track.name}
          </div>
          {$artistName}
        </div>
        {$duration}
      </Link>
    )
  })

  let $content = []
  if (columns === 1) {
    $content.push(<div class={props.class}>{$tracks}</div>)
  } else if (columns === 2) {
    const columnLength = Math.ceil(tracks.length / columns)
    $content.push(
      <div class={c('fl w-100 w-50-m w-50-l', props.class)}>
        {$tracks.slice(0, columnLength)}
      </div>
    )
    $content.push(
      <div class={c('fl w-100 w-50-m w-50-l', props.class)}>
        {$tracks.slice(columnLength)}
      </div>
    )
  } else {
    throw new Error('`column` value must be 1 or 2')
  }

  return <div class='cf fw3'>{$content}</div>
}

module.exports = TrackList
