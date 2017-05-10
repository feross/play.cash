const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const ProgressiveImage = require('./ProgressiveImage')
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
    <div>
      <Link
        href={artist.url}
        class={c('db br-100', props.class)}
      >
        <ProgressiveImage
          class='w-100 db br-100 shadow-2'
          containerClass='br-100'
          src={images}
          sizes={sizes}
          sizeHint={sizeHint}
          alt={artist.name + ' Image'}
        />
      </Link>
      <Link
        href={artist.url}
        class={c('db tc', props.class)}
        color='inherit'
      >
        <dl class='mv2 f5 f4-m f4-l lh-copy'>
          <dt class='clip'>Title</dt>
          <dd class='ml0 truncate w-100'>{artist.name}</dd>
        </dl>
      </Link>
    </div>
  )
}

module.exports = Artist
