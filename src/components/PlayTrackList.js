const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const PlayTrack = require('./PlayTrack')

const PlayTrackList = (props) => {
  const { tracks } = props

  const $tracks = tracks.map(track => {
    return (
      <PlayTrack
        class={props.class}
        track={track}
      />
    )
  })

  return (
    <div class={c('db pl0 ba b--light-silver br2 bg-white', props.class)}>
      {$tracks}
    </div>
  )
}

module.exports = PlayTrackList
