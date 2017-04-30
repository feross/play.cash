const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')

const ContentSheet = require('../components/ContentSheet')

class NotFoundPage extends Component {
  componentDidMount () {
    const { location } = store
    const q = location.pathname.replace(/\/|-/g, ' ').trim()

    store.dispatch('FETCH_SEARCH', { q })
  }

  render (props) {
    return (
      <ContentSheet>
        <h1>Error – Page Not Found</h1>
        <h2>Maybe you were looking for one of these?</h2>
        <p>TODO</p>
      </ContentSheet>
    )
  }
}

module.exports = NotFoundPage
