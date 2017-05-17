module.exports = {
  getArtist,
  getAlbum,
  getTrack,
  getEntity,
  getArtistByName,
  getArtistForTrack: getArtistForTrackOrAlbum,
  getArtistForAlbum: getArtistForTrackOrAlbum
}

const entity = require('./entity')
const store = require('./store')

function getArtist (artistUrl) {
  return store.artists[artistUrl]
}

function getAlbum (albumUrl) {
  const artist = getArtistForTrackOrAlbum(albumUrl)
  if (!artist) return null
  return artist.albums[albumUrl]
}

function getTrack (trackUrl) {
  const artist = getArtistForTrackOrAlbum(trackUrl)
  if (!artist) return null
  return artist.tracks[trackUrl]
}

function getEntity (entityUrl) {
  const ent = entity.decode(entityUrl)
  if (ent.type === 'artist') return getArtist(entityUrl)
  if (ent.type === 'track') return getTrack(entityUrl)
  if (ent.type === 'album') return getAlbum(entityUrl)
}

function getArtistByName (artistName) {
  const artistUrl = entity.encode({ type: 'artist', name: artistName })
  return getArtist(artistUrl)
}

function getArtistForTrackOrAlbum (trackOrAlbumUrl) {
  const { artistName } = entity.decode(trackOrAlbumUrl)
  const artistUrl = entity.encode({ type: 'artist', name: artistName })
  const artist = store.artists[artistUrl]
  return artist || null
}
