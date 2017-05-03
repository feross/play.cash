const { h } = require('preact') /** @jsx h */

const Artist = require('./Artist')

const PlayArtist = (props) => {
  const {
    artist,
    sizeHint = '20vw'
  } = props

  return (
    <Artist
      class={props.class}
      name={artist.name}
      href={artist.url}
      images={artist.images}
      sizes={[34, 64, 174, 300]}
      sizeHint={sizeHint}
    />
  )
}

module.exports = PlayArtist
