const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const ProgressiveImage = require('./ProgressiveImage')
const Link = require('./Link')

const Album = (props) => {
  const {
    album,
    sizes = [34, 64, 174, 300],
    sizeHint = '20vw',
    showName = true,
    showArtistName = true,
    showLink = true,
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

  let $metadata = []
  if (showName || showArtistName) {
    if (showName) {
      $metadata.push(
        <div>
          <dt class='clip'>Title</dt>
          <dd class='ml0 black truncate w-100'>{album.name}</dd>
        </div>
      )
    }

    if (showArtistName) {
      $metadata.push(
        <div>
          <dt class='clip'>Artist</dt>
          <dd class='ml0 silver truncate w-100'>{album.artistName}</dd>
        </div>
      )
    }

    $metadata = <dl class='mt2 f6 lh-copy'>{$metadata}</dl>
  }

  const $contents = [$image, $metadata]

  if (showLink) {
    return (
      <Link
        href={album.url}
        class={c('db no-underline grow tc', props.class)}
        defaultStyle={false}
      >
        {$contents}
      </Link>
    )
  } else {
    return <div {...rest}>{$contents}</div>
  }
}

module.exports = Album
