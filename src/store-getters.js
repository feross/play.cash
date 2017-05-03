module.exports = {
  getArtist,
  getArtistByName,
  getAlbum,
  getTrack
}

const entity = require('./entity')
const store = require('./store')

function getArtist (artistUrl) {
  return store.artists[artistUrl]
}

function getArtistByName (artistName) {
  const artistUrl = entity.encode({ type: 'artist', name: artistName })
  return getArtist(artistUrl)
}

function getAlbum (albumUrl) {
  const { artistName } = entity.decode(albumUrl)
  const artistUrl = entity.encode({ type: 'artist', name: artistName })
  const artist = store.artists[artistUrl]
  if (!artist) return null
  return artist.albums[albumUrl]
}

function getTrack (trackUrl) {
  const { artistName } = entity.decode(trackUrl)
  const artistUrl = entity.encode({ type: 'artist', name: artistName })
  const artist = store.artists[artistUrl]
  if (!artist) return null
  return artist.tracks[trackUrl]
}
