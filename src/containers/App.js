const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')

const Header = require('../components/Header')
const HomePage = require('./HomePage')
const TrackPage = require('./TrackPage')
const Player = require('./Player')

const PAGES = {
  'home': HomePage,
  'track': TrackPage
}

class App extends Component {
  render (props) {
    const { location } = store

    const Page = PAGES[location.name]
    const $page = Page ? <Page /> : null

    return (
      <div id='app' class='near-black f5'>
        <Player />
        <Header />
        {$page}
      </div>
    )
  }
}

module.exports = App
