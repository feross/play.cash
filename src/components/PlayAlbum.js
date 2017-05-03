const { h } = require('preact') /** @jsx h */

const Album = require('./Album')

const PlayAlbum = (props) => {
  const {
    album,
    sizeHint = '20vw'
  } = props

  const images = album.images.length > 0
    ? album.images
    : '/img/default-album.svg'

  return (
    <Album
      class={props.class}
      name={album.name}
      artistName={album.artistName}
      href={album.url}
      images={images}
      sizes={[34, 64, 174, 300]}
      sizeHint={sizeHint}
    />
  )
}

module.exports = PlayAlbum
