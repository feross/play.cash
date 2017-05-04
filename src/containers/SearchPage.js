const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')

const ContentSheet = require('../components/ContentSheet')

class SearchPage extends Component {
  componentDidMount () {
    const { location } = store
    // const q = location.pathname.replace(/\/|-/g, ' ').trim()

    // store.dispatch('FETCH_SEARCH', { q })
  }

  render (props) {
    return (
      <ContentSheet>
        <h1>Search</h1>
      </ContentSheet>
    )
  }
}

module.exports = SearchPage
