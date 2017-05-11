const { Component, h } = require('preact') /** @jsx h */

const entity = require('../entity')
const store = require('../store')
const { getTrack } = require('../store-getters')

const FactsOverlay = require('./FactsOverlay')
const Loader = require('../components/Loader')
const Sheet = require('../components/Sheet')

class TrackPage extends Component {
  componentDidMount () {
    this._fetch()
  }

  componentWillReceiveProps (nextProps) {
    if (!entity.equal(this.props.entity, nextProps.entity)) this._fetch()
  }

  _fetch () {
    const { entity } = store
    store.dispatch('FETCH_TRACK', entity)
    store.dispatch('FETCH_FACTS', entity)
  }

  render (props) {
    const { entity, player } = store
    const track = getTrack(entity.url)

    const facts = track && track.facts

    const $bufferingLoader = player.buffering
      ? <Sheet><Loader center /></Sheet>
      : null

    return (
      <div>
        <FactsOverlay
          time={player.time}
          duration={player.duration}
          width={player.width}
          height={player.height}
          facts={facts}
        />
        {$bufferingLoader}
      </div>
    )
  }
}

module.exports = TrackPage
