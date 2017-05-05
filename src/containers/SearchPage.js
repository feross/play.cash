const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')
const { getArtist, getAlbum, getTrack } = require('../store-getters')

const AlbumList = require('../components/AlbumList')
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
      const artists = results.artists.map(getArtist)
      const $artists = <ArtistList artists={artists} />

      const tracks = results.tracks.map(getTrack)
      const $tracks = <TrackList tracks={tracks} />

      const albums = results.albums.map(getAlbum)
      const $albums = <AlbumList albums={albums} />

      $content = (
        <div>
          <div class='cf fl w-50 pr4'>
            <Heading class='tc'>Tracks</Heading>
            {$tracks}
          </div>
          <div class='cf fl w-50'>
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
        <h1>
          <span class='black-30'>Showing results for </span>
          <span>{q}</span>
        </h1>
        {$content}
      </ContentSheet>
    )
  }
}

module.exports = SearchPage
