const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')

const ContentSheet = require('../components/ContentSheet')

class TrackPage extends Component {
  componentDidMount () {
    const { entity } = store
    store.dispatch('FETCH_TRACK', entity)
  }

  render (props) {
    const { location } = store
    return (
      <ContentSheet>
      </ContentSheet>
    )
  }
}

module.exports = TrackPage
