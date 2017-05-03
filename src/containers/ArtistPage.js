const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')
const { getArtist, getAlbum, getTrack } = require('../store-getters')
const { formatInt } = require('../format')

const ContentSheet = require('../components/ContentSheet')
const Heading = require('../components/Heading')
const LoadingSheet = require('../components/LoadingSheet')
const Album = require('../components/Album')
const TrackList = require('../components/TrackList')

class ArtistPage extends Component {
  componentDidMount () {
    const { entity } = store
    store.dispatch('FETCH_ARTIST_INFO', { name: entity.name })
    store.dispatch('FETCH_ARTIST_TOP_ALBUMS', { name: entity.name, limit: 15 })
    store.dispatch('FETCH_ARTIST_TOP_TRACKS', { name: entity.name, limit: 20 })
  }

  render (props) {
    const { entity } = store

    const artist = getArtist(entity.url)

    if (!artist ||
        !artist.images ||
        !artist.topAlbumUrls ||
        !artist.topTrackUrls) {
      return <LoadingSheet />
    }

    const $topAlbums = artist.topAlbumUrls
      .map(getAlbum)
      .map(album => <Album class='fl w-100 w-50-m w-33-l pa2' album={album} />)

    const topTracks = artist.topTrackUrls.map(getTrack)
    const $topTracks = <TrackList tracks={topTracks} />

    const coverImage = artist.images[artist.images.length - 1]
    const listeners = formatInt(artist.listeners)

    return (
      <ContentSheet class='cf'>
        <div
          class='relative cover nl4 nr4 nt4 br3 br--top mb4 white text-outline'
          style={{
            'background-image': `url(${coverImage})`,
            height: '60vh',
            'background-position': 'center 20%'
          }}
        >
          <div class='absolute bottom-2 left-2 w-80'>
            <div class='f6 mv0 tracked ttu'>Artist</div>
            <h1 class='f3 f1-m f-subheadline-l sans-serif mt1 mb0 w-100 truncate'>
              {artist.name}
            </h1>
          </div>
          <div class='absolute bottom-2 right-2 mb3'>
            <div class='f6 mv0 tracked ttu white-80'>{listeners} listeners</div>
          </div>
        </div>
        <div class='cf fl w-50 pr4'>
          <Heading class='tc'>Top Tracks</Heading>
          {$topTracks}
        </div>
        <div class='cf fl w-50'>
          <Heading class='tc'>Top Albums</Heading>
          {$topAlbums}
        </div>
      </ContentSheet>
    )
  }
}

module.exports = ArtistPage
