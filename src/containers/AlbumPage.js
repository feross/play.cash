const { Component, h } = require('preact') /** @jsx h */

// const store = require('../store')

const ContentSheet = require('../components/ContentSheet')
const Heading = require('../components/Heading')

class AlbumPage extends Component {
  componentDidMount () {
  }

  render (props) {
    return (
      <ContentSheet>
        <Heading class='tc'>Songs</Heading>
      </ContentSheet>
    )
  }
}

module.exports = AlbumPage
