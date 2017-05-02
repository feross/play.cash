const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')

const Album = require('../components/Album')
const PlayArtist = require('../components/PlayArtist')
const ContentSheet = require('../components/ContentSheet')
const Heading = require('../components/Heading')

class HomePage extends Component {
  componentDidMount () {
    store.dispatch('FETCH_CHART_TOP_ARTISTS', { limit: 10 })
  }

  render (props) {
    const { chartTopArtists = [] } = store.music

    const $chartTopArtists = chartTopArtists.map(artist => {
      return (
        <PlayArtist sizeHint='20vw' {...artist} class='fl w-50 w-25-m w-20-l pa2' />
      )
    })

    return (
      <ContentSheet>
        <Heading class='tc'>Top Artists</Heading>
        <div class='cf'>
          {$chartTopArtists}
        </div>
      </ContentSheet>
    )
  }
}

module.exports = HomePage
