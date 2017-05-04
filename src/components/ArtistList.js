const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Artist = require('./Artist')

const ArtistList = (props) => {
  const { artists } = props

  const $artists = artists.map(artist => {
    return (
      <Artist
        class='fl w-100 w-50-m w-33-l pa2'
        artist={artist}
      />
    )
  })

  return (
    <div class={c('cf', props.class)}>
      {$artists}
    </div>
  )
}

module.exports = ArtistList
