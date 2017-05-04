const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')
const { getArtistByName, getAlbum } = require('../store-getters')

const ContentSheet = require('../components/ContentSheet')
const Link = require('../components/Link')
const LoadingSheet = require('../components/LoadingSheet')
const Album = require('../components/Album')
const TrackList = require('../components/TrackList')

class AlbumPage extends Component {
  componentDidMount () {
    const { entity } = store
    store.dispatch('FETCH_ALBUM_INFO', entity)
  }

  render (props) {
    const { entity } = store
    const album = getAlbum(entity.url)

    if (!album || !album.images) return <LoadingSheet />

    const artist = getArtistByName(album.artistName)

    return (
      <ContentSheet>
        <div class='cf'>
          <Album
            class='fl w-30 pr4'
            album={album}
            sizeHint='30vw'
            metadata={false}
          />
          <div class='fl w-50'>
            <h5 class='tracked ttu'>Album</h5>
            <h1>{album.name}</h1>
            <h4>By <Link href={artist.url}>{artist.name}</Link></h4>
            <div class='lh-copy measure h4 overflow-hidden'>
              {album.summary}
            </div>
          </div>
        </div>
        <TrackList tracks={album.tracks} />
      </ContentSheet>
    )
  }
}

module.exports = AlbumPage
