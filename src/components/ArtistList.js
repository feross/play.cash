const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Artist = require('./Artist')

const ArtistList = (props) => {
  const {
    artists,
    size = 'large'
  } = props

  let cls
  if (size === 'large') cls = 'w-100 w-50-m w-33-l'
  if (size === 'medium') cls = 'w-50 w-33-m w-25-l'
  if (size === 'small') cls = 'w-50 w-25-m w-20-l'

  const $artists = artists.map(artist => {
    return (
      <Artist
        class={c('fl pa2', cls)}
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
