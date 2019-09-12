const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Artist = require('./Artist')

const ArtistList = (props) => {
  const {
    artists,
    size = 'large'
  } = props

  let cls
  if (size === 'large') cls = 'w-50 w-50-m w-third-l'
  if (size === 'medium') cls = 'w-50 w-third-m w-25-l'
  if (size === 'small') cls = 'w-50 w-third-m w-sixth-l'

  const $artists = artists.map(artist => {
    return (
      <div
        class={c('fl pa2 pa2-m pa3-l mb0 mb2-m mb3-l', cls)}
        key={artist.url}
      >
        <Artist
          artist={artist}
        />
      </div>
    )
  })

  return (
    <div class={c('cf mv3', props.class)}>
      {$artists}
    </div>
  )
}

module.exports = ArtistList
