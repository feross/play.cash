const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Link = require('./Link')

const TrackList = (props) => {
  const { tracks } = props

  const $tracks = tracks.map((track, i) => {
    const cls = (i !== tracks.length - 1)
      ? 'bb b--moon-gray'
      : ''

    return (
      <Link
        class={c(
          'db pa3 truncate link color-inherit hover-bg-lightest-blue',
          cls,
          props.class
        )}
        href={track.url}
        defaultStyle={false}
      >
        <i class='material-icons fl nt1 nl1 absolute'>play_arrow</i>
        <span class='ml4'>{track.name}</span>
        <span class='pl2 black-40'>{track.artistName}</span>
      </Link>
    )
  })

  return (
    <div class={c('db pl0 ba b--moon-gray br2 bg-white', props.class)}>
      {$tracks}
    </div>
  )
}

module.exports = TrackList
