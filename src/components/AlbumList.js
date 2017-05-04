const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Album = require('./Album')

const AlbumList = (props) => {
  const { albums, showName, showArtistName, showLink } = props

  const $albums = albums.map(album => {
    return (
      <Album
        class='fl w-100 w-50-m w-33-l pa2'
        album={album}
        showName={showName}
        showArtistName={showArtistName}
        showLink={showLink}
      />
    )
  })

  return (
    <div class={c('cf', props.class)}>
      {$albums}
    </div>
  )
}

module.exports = AlbumList
