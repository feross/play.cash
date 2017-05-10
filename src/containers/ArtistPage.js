const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')
const { getArtist, getAlbum, getTrack } = require('../store-getters')
const { formatInt } = require('../format')

const AlbumList = require('../components/AlbumList')
const ContentSheet = require('../components/ContentSheet')
const Heading = require('../components/Heading')
const Loader = require('../components/Loader')
const TrackList = require('../components/TrackList')

class ArtistPage extends Component {
  componentDidMount () {
    const { entity } = store
    store.dispatch('FETCH_ARTIST_INFO', { name: entity.name })
    store.dispatch('FETCH_ARTIST_TOP_ALBUMS', { name: entity.name, limit: 18 })
    store.dispatch('FETCH_ARTIST_TOP_TRACKS', { name: entity.name, limit: 30 })
  }

  render (props) {
    const { entity } = store
    const artist = getArtist(entity.url)

    if (!artist || !artist.images) {
      return <ContentSheet><Loader /></ContentSheet>
    }

    let $content = <Loader />

    const topTracks = artist.topTrackUrls.map(getTrack)
    const topAlbums = artist.topAlbumUrls.map(getAlbum)

    if (topTracks.length > 0 && topAlbums.length > 0) {
      const $topTracks = (
        <div class='fl w-50 pr4'>
          <Heading>Top Tracks</Heading>
          <TrackList tracks={topTracks} showArtistName={false} />
        </div>
      )

      const $topAlbums = (
        <div class='fl w-50'>
          <Heading>Top Albums</Heading>
          <AlbumList albums={topAlbums} showArtistName={false} />
        </div>
      )

      $content = [$topTracks, $topAlbums]
    }

    const coverImage = artist.images[artist.images.length - 1]
    const listeners = formatInt(artist.listeners)

    return (
      <ContentSheet class='cf'>
        <div
          class='artist-page-cover relative cover nl4 nr4 nt6 mb3 text-outline shadow-2'
          style={{
            'background-image': `url(${coverImage}), linear-gradient(#AAA, #999)`
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
        {$content}
      </ContentSheet>
    )
  }
}

module.exports = ArtistPage
