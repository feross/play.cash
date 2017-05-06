const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')
const { getTrack } = require('../store-getters')

const FactsOverlay = require('./FactsOverlay')

// TODO: remove
const DEFAULT_FACTS = ['A shining crescent far beneath the flying vessel.', 'A red flair silhouetted the jagged edge of a wing.', 'Almost before we knew it, we had left the ground.', 'She stared through the window at the stars.']

class TrackPage extends Component {
  componentDidMount () {
    const { entity } = store
    store.dispatch('FETCH_TRACK', entity)
    store.dispatch('FETCH_FACTS', entity)
  }

  render (props) {
    const { entity, player } = store

    const track = getTrack(entity.url)

    const facts = track && track.facts.length
      ? track.facts
      : DEFAULT_FACTS

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
