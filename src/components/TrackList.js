const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Link = require('./Link')

const TrackList = (props) => {
  const {
    tracks,
    showArtistName = true
  } = props

  const $tracks = tracks.map((track, i) => {
    const cls = (i !== tracks.length - 1)
      ? 'bb b--black-20'
      : ''

    let $artistName = null
    if (showArtistName) {
      $artistName = <span class='pl2 black-40'>{track.artistName}</span>
    }

    return (
      <Link
        class={c(
          'db pa3 truncate link color-inherit hover-bg-washed-red',
          cls
        )}
        href={track.url}
        defaultStyle={false}
      >
        <i class='material-icons fl nt1 nl1 absolute'>play_arrow</i>
        <span class='ml4'>{track.name}</span>
        {$artistName}
      </Link>
    )
  })

  return (
    <div class={c('db pl0 ba b--black-20 br2 bg-white-70', props.class)}>
      {$tracks}
    </div>
  )
}

module.exports = TrackList
