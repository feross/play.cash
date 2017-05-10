const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')
const { getArtist, getAlbum, getTrack, getEntity } = require('../store-getters')

const Album = require('../components/Album')
const AlbumList = require('../components/AlbumList')
const Artist = require('../components/Artist')
const ArtistList = require('../components/ArtistList')
const ContentSheet = require('../components/ContentSheet')
const Heading = require('../components/Heading')
const Loader = require('../components/Loader')
const TrackList = require('../components/TrackList')

class SearchPage extends Component {
  componentDidMount () {
    const { entity } = store
    const { q } = entity
    store.dispatch('FETCH_SEARCH', { q })
  }

  render (props) {
    const { entity, searches } = store
    const { url, q } = entity

    const results = searches[url]

    let $content = <Loader />

    if (results) {
      let $topResult = null
      if (results.top) {
        const topResult = getEntity(results.top)
        if (topResult.type === 'artist') $topResult = <Artist artist={topResult} />
        else if (topResult.type === 'album') $topResult = <Album album={topResult} />
      }

      const tracks = results.tracks.map(getTrack)
      const $tracks = <TrackList tracks={tracks} />

      const artists = results.artists.map(getArtist)
      const $artists = <ArtistList artists={artists} size='small' />

      const albums = results.albums.map(getAlbum)
      const $albums = <AlbumList albums={albums} size='small' />

      $content = (
        <div>
          <div class='cf mt4'>
            <div class='fl w-third pr4'>
              <div class='mw6 center'>
                {$topResult}
              </div>
            </div>
            <div class='fl w-two-thirds'>
              {$tracks}
            </div>
          </div>
          <div class='w-100'>
            <Heading class='tc'>Artists</Heading>
            {$artists}
            <Heading class='tc'>Albums</Heading>
            {$albums}
          </div>
        </div>
      )
    }

    return (
      <ContentSheet class='cf'>
        <Heading class='tc'>
          <span class='white-50'>Showing results for </span>
          <span>{q}</span>
        </Heading>
        {$content}
      </ContentSheet>
    )
  }
}

module.exports = SearchPage
