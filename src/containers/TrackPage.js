const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')

const Input = require('../components/Input')
const Sheet = require('../components/Sheet')

class TrackPage extends Component {
  componentDidMount () {
    const { location } = store
    store.dispatch('FETCH_TRACK', location.params)
  }

  render (props) {
    const { location } = store
    return (
      <div id='home-page'>
        <Sheet class='tc relative mw8 mt6 ma-100 center'>
          <h1 class='f2'>track: {location.params.track}</h1>
          <h1 class='f2'>artist: {location.params.artist}</h1>
          <h1 class='f2'>videoId: {store.player.videoId}</h1>
          <Input
            placeholder='Defend Gotham'
          />
        </Sheet>
      </div>
    )
  }
}

module.exports = TrackPage
