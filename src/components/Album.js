const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const ProgressiveImage = require('./ProgressiveImage')
const Link = require('./Link')

const Album = (props) => {
  const {
    album,
    sizes = [34, 64, 174, 300],
    sizeHint = '20vw',
    metadata = true,
    ...rest
  } = props

  const images = album.images.length > 0
    ? album.images
    : '/img/default-album.svg'

  const $image = (
    <ProgressiveImage
      class='w-100 db ba b--moon-gray'
      src={images}
      sizes={sizes}
      sizeHint={sizeHint}
      alt={album.artistName + ' ' + album.name + ' Album Cover'}
    />
  )

  if (!metadata) {
    return <div {...rest}>{$image}</div>
  }

  return (
    <Link
      href={album.url}
      class={c('db no-underline grow tc', props.class)}
      defaultStyle={false}
    >
      {$image}
      <dl class='mt2 f6 lh-copy'>
        <dt class='clip'>Title</dt>
        <dd class='ml0 black truncate w-100'>{album.name}</dd>
        <dt class='clip'>Artist</dt>
        <dd class='ml0 gray truncate w-100'>{album.artistName}</dd>
      </dl>
    </Link>
  )
}

module.exports = Album
