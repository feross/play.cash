const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')

const Album = require('../components/Album')
const ContentSheet = require('../components/ContentSheet')
const Heading = require('../components/Heading')

class HomePage extends Component {
  render (props) {
    return (
      <ContentSheet>
        <Heading class='tc'>Albums</Heading>
        <Heading class='tc'>Artists</Heading>
      </ContentSheet>
    )
  }
}

module.exports = HomePage
