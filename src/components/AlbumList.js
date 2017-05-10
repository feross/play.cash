const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Album = require('./Album')

const AlbumList = (props) => {
  const {
    albums,
    showName,
    showArtistName,
    showLink,
    size = 'large'
  } = props

  let cls
  if (size === 'large') cls = 'w-100 w-50-m w-33-l'
  if (size === 'medium') cls = 'w-50 w-33-m w-25-l'
  if (size === 'small') cls = 'w-25 w-20-m w-sixth-l'

  const $albums = albums.map(album => {
    return (
      <div
        class={c('fl pa2 pa2-m pa3-l mb3', cls)}
      >
        <Album
          album={album}
          showName={showName}
          showArtistName={showArtistName}
          showLink={showLink}
        />
      </div>
    )
  })

  return (
    <div class={c('cf mv3', props.class)}>
      {$albums}
    </div>
  )
}

module.exports = AlbumList
