module.exports = {
  getArtist,
  getAlbum,
  getTrack
}

const entity = require('./entity')
const store = require('./store')

function getArtist (artistUrl) {
  return store.artists[artistUrl]
}

function getAlbum (albumUrl) {
  const { artistName } = entity.decode(albumUrl)
  const artistUrl = entity.encode({ type: 'artist', name: artistName })
  return store.artists[artistUrl].albums[albumUrl]
}

function getTrack (trackUrl) {
  const { artistName } = entity.decode(trackUrl)
  const artistUrl = entity.encode({ type: 'artist', name: artistName })
  return store.artists[artistUrl].tracks[trackUrl]
}
