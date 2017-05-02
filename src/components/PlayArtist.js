const { h } = require('preact') /** @jsx h */

const Artist = require('./Artist')

const entity = require('../entity')

const PlayArtist = (props) => {
  const {
    name,
    images,
    sizeHint = '20vw'
  } = props

  const href = entity.encode({ type: 'artist', name })

  return (
    <Artist
      class={props.class}
      name={name}
      href={href}
      images={images}
      sizes={[34, 64, 174, 300]}
      sizeHint={sizeHint}
    />
  )
}

module.exports = PlayArtist
