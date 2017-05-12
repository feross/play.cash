const { Component, h } = require('preact') /** @jsx h */

const entity = require('../entity')
const store = require('../store')
const { getTrack } = require('../store-getters')

const FactsOverlay = require('./FactsOverlay')
const Loader = require('../components/Loader')
const Sheet = require('../components/Sheet')

class TrackPage extends Component {
  componentDidMount () {
    this._load()
  }

  componentWillReceiveProps (nextProps) {
    if (!entity.equal(this.props.entity, nextProps.entity)) this._load()
  }

  _load () {
    const { entity } = store
    store.dispatch('SET_TITLE', entity.name + ' by ' + entity.artistName)
    store.dispatch('FETCH_VIDEO', entity)
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
