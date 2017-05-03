const { h } = require('preact') /** @jsx h */

const Track = require('./Track')

const PlayTrack = (props) => {
  const { track } = props

  return (
    <Track
      class={props.class}
      name={track.name}
      artistName={track.artistName}
      href={track.url}
    />
  )
}

module.exports = PlayTrack
