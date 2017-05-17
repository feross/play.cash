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
      src={images}
      sizes={sizes}
      sizeHint={sizeHint}
      alt={album.artistName + ' ' + album.name + ' Album Cover'}
    />
  )

  let $metadata = null
  if (showName || showArtistName) {
    const $metadataContents = []
    if (showName) {
      $metadataContents.push(<dt class='clip'>Title</dt>)
      $metadataContents.push(<dd class='ml0 truncate w-100'>{album.name}</dd>)
    }

    if (showArtistName) {
      $metadataContents.push(<dt class='clip'>Artist</dt>)
      $metadataContents.push(<dd class='ml0 white-50 truncate w-100'>By {album.artistName}</dd>)
    }

    $metadata = (
      <dl class='mv2 f5 f4-m f4-l lh-copy'>{$metadataContents}</dl>
    )
  }

  const $content = [$image, $metadata]

  if (showLink) {
    return (
      <Link
        href={album.url}
        class={c('db tc', props.class)}
        {...rest}
      >
        {$content}
      </Link>
    )
  } else {
    return (
      <div class={props.class} {...rest}>
        {$content}
      </div>
    )
  }
}

module.exports = Album
