const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')
const { getTrack } = require('../store-getters')

const FactsOverlay = require('./FactsOverlay')

class TrackPage extends Component {
  componentDidMount () {
    const { entity } = store
    store.dispatch('FETCH_TRACK', entity)
    store.dispatch('FETCH_FACTS', entity)
  }

  render (props) {
    const { entity, player } = store

    const track = getTrack(entity.url)

    const facts = track && track.facts

    return (
      <FactsOverlay
        time={player.time}
        duration={player.duration}
        width={player.width}
        height={player.height}
        facts={facts}
      />
    )
  }
}

module.exports = TrackPage
