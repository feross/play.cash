const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')
const { getArtist, getTrack } = require('../store-getters')

const ArtistList = require('../components/ArtistList')
const Heading = require('../components/Heading')
const Loader = require('../components/Loader')
const Sheet = require('../components/Sheet')
const TrackList = require('../components/TrackList')

class HomePage extends Component {
  componentDidMount () {
    this._load()
  }

  _load () {
    store.dispatch('FETCH_CHART_TOP_ARTISTS', { limit: 12 })
    store.dispatch('FETCH_CHART_TOP_TRACKS', { limit: 30 })
    store.dispatch('APP_TITLE', null)
  }

  render (props) {
    const { topArtistUrls, topTrackUrls } = store.charts

    const topArtists = topArtistUrls.map(getArtist)
    const topTracks = topTrackUrls.map(getTrack)

    if (topArtists.length === 0 || topTracks.length === 0) {
      return <Sheet><Loader center /></Sheet>
    }

    const $topArtists = <ArtistList artists={topArtists} size='small' />
    const $topTracks = <TrackList tracks={topTracks} columns={2} />

    return (
      <Sheet>
        <div class='nt3'>
          <Heading class='tc'>Top Artists</Heading>
          {$topArtists}
        </div>
        <div class='mw7 center'>
          <Heading class='tc'>Top Songs</Heading>
          {$topTracks}
        </div>
      </Sheet>
    )
  }
}

module.exports = HomePage
