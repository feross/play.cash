module.exports = {
  getArtist,
  getAlbum,
  getTrack,
  getEntity,
  getArtistForTrack: getArtistForTrackOrAlbum,
  getArtistForAlbum: getArtistForTrackOrAlbum,
  getAlbumForTrack,
  getControlsVisible
}

const entity = require('./entity')
const store = require('./store')

function getArtist (artistUrl) {
  return store.artists[artistUrl] || null
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

function getArtistForTrackOrAlbum (trackOrAlbumUrl) {
  const { artistName } = entity.decode(trackOrAlbumUrl)
  const artistUrl = entity.encode({ type: 'artist', name: artistName })
  return getArtist(artistUrl)
}

function getAlbumForTrack (trackUrl) {
  const track = getTrack(trackUrl)
  if (!track) return null
  const { artistName, albumName } = track
  const albumUrl = entity.encode({ type: 'album', name: albumName, artistName })
  return getAlbum(albumUrl)
}

function getControlsVisible () {
  const { app, player, location } = store
  return !app.idle || !player.playing || player.buffering || player.fetchingTrack ||
    location.name !== 'track'
}
