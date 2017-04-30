const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')

const ContentSheet = require('../components/ContentSheet')

class TrackPage extends Component {
  componentDidMount () {
    const { location } = store
    store.dispatch('FETCH_TRACK', location.params)
  }

  render (props) {
    const { location } = store
    return (
      <ContentSheet>
        <h1 class='f2'>track: {location.params.track}</h1>
        <h1 class='f2'>artist: {location.params.artist}</h1>
        <h1 class='f2'>videoId: {store.player.videoId}</h1>
      </ContentSheet>
    )
  }
}

module.exports = TrackPage
