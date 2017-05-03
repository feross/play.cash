const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')
const { getArtist, getTrack } = require('../store-getters')

const Artist = require('../components/Artist')
const TrackList = require('../components/TrackList')
const ContentSheet = require('../components/ContentSheet')
const Heading = require('../components/Heading')

class HomePage extends Component {
  componentDidMount () {
    store.dispatch('FETCH_CHART_TOP_ARTISTS', { limit: 10 })
    store.dispatch('FETCH_CHART_TOP_TRACKS', { limit: 30 })
  }

  render (props) {
    const { topArtistUrls, topTrackUrls } = store.charts

    const $topArtists = topArtistUrls
      .map(getArtist)
      .map(artist => <Artist class='fl w-50 w-25-m w-20-l pa2' artist={artist} />)

    const topTracks = topTrackUrls.map(getTrack)
    const $topTracks = <TrackList tracks={topTracks} />

    return (
      <ContentSheet>
        <Heading class='tc'>Top Artists</Heading>
        <div class='cf'>
          {$topArtists}
        </div>
        <Heading class='tc'>Top Songs</Heading>
        <div class='cf'>
          {$topTracks}
        </div>
      </ContentSheet>
    )
  }
}

module.exports = HomePage
