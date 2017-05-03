const api = require('./api')
const debug = require('debug')('store')
const entity = require('./entity')

const store = {
  location: {
    name: null,
    params: {},
    pathname: null
  },
  entity: null,
  player: {
    width: 0,
    height: 0,
    videoId: null,
    playing: false,
    volume: 100,
    playbackRate: 1
  },
  artists: {},
  charts: {
    topArtists: [],
    topTracks: []
  },
  currentTrack: null,
  errors: []
}

function dispatch (type, data) {
  debug('%s %o', type, data)
  switch (type) {
    case 'LOCATION_CHANGE': {
      store.location = data
      store.entity = entity.decode(data.pathname)
      return update()
    }

    case 'PLAYER_RESIZE': {
      store.player.width = data.width
      store.player.height = data.height
      return update()
    }

    case 'FETCH_TRACK': {
      const q = data.artist + ' ' + data.name
      api.video({ q, maxResults: 1 }, (err, result) => {
        dispatch('FETCH_TRACK_DONE', { err, result })
      })
      return
    }
    case 'FETCH_TRACK_DONE': {
      const { err, result } = data
      if (err) throw err // TODO
      const [video] = result
      if (!video) throw new Error('No track found') // TODO

      store.player.videoId = video.id
      return update()
    }

    case 'FETCH_SEARCH': {
      api.music({ method: 'search', ...data }, (err, result) => {
        dispatch('FETCH_SEARCH_DONE', { err, result })
      })
      return
    }
    case 'FETCH_SEARCH_DONE': {
      const { err, result } = data
      if (err) throw err // TODO
      console.log(result) // TODO
      return update()
    }

    case 'FETCH_CHART_TOP_ARTISTS': {
      api.music({ method: 'chartTopArtists', ...data }, (err, result) => {
        dispatch('FETCH_CHART_TOP_ARTISTS_DONE', { err, result })
      })
      return
    }
    case 'FETCH_CHART_TOP_ARTISTS_DONE': {
      const { err, result } = data
      if (err) return store.errors.push(err)

      const artists = result.result // TODO
      addArtists(artists)
      store.charts.topArtists = artists.map(artist => artist.url)

      return update()
    }

    case 'FETCH_CHART_TOP_TRACKS': {
      api.music({ method: 'chartTopTracks', ...data }, (err, result) => {
        dispatch('FETCH_CHART_TOP_TRACKS_DONE', { err, result })
      })
      return
    }
    case 'FETCH_CHART_TOP_TRACKS_DONE': {
      const { err, result } = data
      if (err) return store.errors.push(err)

      const tracks = result.result // TODO
      addTracks(tracks)

      store.charts.topTracks = tracks.map(track => track.url)

      return update()
    }

    case 'FETCH_ARTIST_TOP_ALBUMS': {
      api.music({ method: 'artistTopAlbums', ...data }, (err, result) => {
        dispatch('FETCH_ARTIST_TOP_ALBUMS_DONE', { err, result })
      })
      return
    }
    case 'FETCH_ARTIST_TOP_ALBUMS_DONE': {
      const { err, result } = data
      if (err) return store.errors.push(err)

      const albums = result.result // TODO
      addAlbums(albums)

      const artist = addArtist({ type: 'artist', name: result.meta.query.artist })
      artist.topAlbums = albums.map(album => album.url)

      return update()
    }

    default: {
      throw new Error('Unrecognized dispatch type: ' + type)
    }
  }
}

// function getArtist (name) {
//   const url = entity.encode({ type: 'artist', name })
//   return store.artists[url]
// }

function addArtist (artist) {
  if (artist.type !== 'artist') throw new Error('Invalid artist')
  if (!artist.url) artist.url = entity.encode(artist)

  // Defaults on all artists
  Object.assign(artist, {
    albums: {},
    topAlbums: []
  })

  store.artists[artist.url] = Object.assign(artist, store.artists[artist.url])
  return artist
}

function addArtists (artists) {
  return artists.map(addArtist)
}

function addAlbum (album) {
  if (album.type !== 'album') throw new Error('Invalid album')
  if (!album.url) album.url = entity.encode(album)

  const artist = addArtist({ type: 'artist', name: album.artist })

  artist.albums[album.url] = Object.assign(album, artist.albums[album.url])
  return album
}

function addAlbums (albums) {
  return albums.map(addAlbum)
}

let updating = false

function update () {
  if (updating) return
  // Support calls to dispatch() during an update(), but don't recurse infinitely
  updating = true; store.update(); updating = false
}

// Add `dispatch()` function. Not enumerable (not app data). Not writable (prevent accidents).
Object.defineProperty(store, 'dispatch', {
  configurable: false,
  enumerable: false,
  writable: false,
  value: dispatch
})

// Add `update()` function. Should be overwritten. Not enumerable (not app data).
Object.defineProperty(store, 'update', {
  configurable: false,
  enumerable: false,
  writable: true,
  value: () => { throw new Error('Missing expected `store.update` function') }
})

// Prevent unexpected properties from being added to `store`. Also, prevent existing
// properties from being "configured" (changed to getter/setter, made non-enumerable, etc.)
Object.seal(store)

module.exports = store
