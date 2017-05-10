const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')
const { getArtist, getTrack } = require('../store-getters')

const ArtistList = require('../components/ArtistList')
const ContentSheet = require('../components/ContentSheet')
const Heading = require('../components/Heading')
const Loader = require('../components/Loader')
const TrackList = require('../components/TrackList')

class HomePage extends Component {
  componentDidMount () {
    this._fetch()
  }

  _fetch () {
    store.dispatch('FETCH_CHART_TOP_ARTISTS', { limit: 12 })
    store.dispatch('FETCH_CHART_TOP_TRACKS', { limit: 30 })
  }

  render (props) {
    const { topArtistUrls, topTrackUrls } = store.charts

    const topArtists = topArtistUrls.map(getArtist)
    const topTracks = topTrackUrls.map(getTrack)

    if (topArtists.length === 0 || topTracks.length === 0) {
      return <ContentSheet><Loader /></ContentSheet>
    }

    const $topArtists = <ArtistList artists={topArtists} size='small' />
    const $topTracks = <TrackList tracks={topTracks} />

    return (
      <ContentSheet>
        <Heading class='tc'>Top Artists</Heading>
        {$topArtists}
        <Heading class='tc'>Top Songs</Heading>
        {$topTracks}
      </ContentSheet>
    )
  }
}

module.exports = HomePage
