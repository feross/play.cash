const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Image = require('./Image')
const Link = require('./Link')

const Artist = (props) => {
  const {
    artist,
    sizes = [34, 64, 174, 300],
    sizeHint = '20vw'
  } = props

  // TODO: use a better default image for artists
  const images = artist.images.length > 0
    ? artist.images
    : '/img/default-album.svg'

  return (
    <Link
      href={artist.url}
      class={c('db grow no-underline tc', props.class)}
      defaultStyle={false}
    >
      <Image
        class='w-100 db ba b--moon-gray br4'
        src={images}
        sizes={sizes}
        sizeHint={sizeHint}
        alt={artist.name + ' Image'}
      />
      <dl class='mt2 f6 lh-copy'>
        <dt class='clip'>Title</dt>
        <dd class='ml0 black truncate w-100'>{artist.name}</dd>
      </dl>
    </Link>
  )
}

module.exports = Artist
