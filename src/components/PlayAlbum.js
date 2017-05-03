const { h } = require('preact') /** @jsx h */

const entity = require('../entity')

const Album = require('./Album')

const PlayAlbum = (props) => {
  const {
    name,
    artist,
    images,
    sizeHint = '20vw'
  } = props

  const href = entity.encode({ type: 'album', name, artist })

  if (images.length === 0) images.push('/img/default-album.svg')

  return (
    <Album
      class={props.class}
      name={name}
      artist={artist}
      href={href}
      images={images}
      sizes={[34, 64, 174, 300]}
      sizeHint={sizeHint}
    />
  )
}

module.exports = PlayAlbum
