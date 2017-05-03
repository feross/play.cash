const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')
const { getArtist, getAlbum, getTrack } = require('../store-getters')

const ContentSheet = require('../components/ContentSheet')
const Heading = require('../components/Heading')
const LoadingSheet = require('../components/LoadingSheet')
const PlayAlbum = require('../components/PlayAlbum')
const PlayTrackList = require('../components/PlayTrackList')

class ArtistPage extends Component {
  componentDidMount () {
    const { entity } = store
    store.dispatch('FETCH_ARTIST_INFO', { name: entity.name })
    store.dispatch('FETCH_ARTIST_TOP_ALBUMS', { name: entity.name, limit: 10 })
    store.dispatch('FETCH_ARTIST_TOP_TRACKS', { name: entity.name, limit: 10 })
  }

  render (props) {
    const { entity } = store

    const artist = getArtist(entity.url)

    if (!artist || !artist.images || !artist.topAlbumUrls || !artist.topTrackUrls) {
      return <LoadingSheet />
    }

    const $topAlbums = artist.topAlbumUrls
      .map(getAlbum)
      .map(album => <PlayAlbum class='fl w-100 w-50-m w-33-l pa2' album={album} />)

    const topTracks = artist.topTrackUrls.map(getTrack)
    const $topTracks = <PlayTrackList tracks={topTracks} />

    const coverImage = artist.images[artist.images.length - 1]

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
          <div class='absolute bottom-2 left-2'>
            <h5 class='mv0 tracked ttu'>Artist</h5>
            <h1 class='f3 f1-m f-headline-l sans-serif mt1 mb0'>{artist.name}</h1>
          </div>
        </div>
        <div class='cf fl w-50 pr4'>
          <Heading class='tc'>Top Albums</Heading>
          {$topAlbums}
        </div>
        <div class='cf fl w-50'>
          <Heading class='tc'>Top Tracks</Heading>
          {$topTracks}
        </div>
      </ContentSheet>
    )
  }
}

module.exports = ArtistPage
