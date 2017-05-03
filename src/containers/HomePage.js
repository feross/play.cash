const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')

const PlayArtist = require('../components/PlayArtist')
const ContentSheet = require('../components/ContentSheet')
const Heading = require('../components/Heading')

class HomePage extends Component {
  componentDidMount () {
    store.dispatch('FETCH_CHART_TOP_ARTISTS', { limit: 10 })
  }

  render (props) {
    const { topArtists } = store.charts

    const $topArtists = topArtists
      .map(url => store.artists[url])
      .map(artist => <PlayArtist class='fl w-50 w-25-m w-20-l pa2' {...artist} />)

    return (
      <ContentSheet>
        <Heading class='tc'>Top Artists</Heading>
        <div class='cf'>
          {$topArtists}
        </div>
      </ContentSheet>
    )
  }
}

module.exports = HomePage
