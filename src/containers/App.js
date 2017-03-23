const { Component, h } = require('preact') /** @jsx h */
const { connect } = require('preact-redux')

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
    const Page = PAGES[props.location.name]
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

const mapStateToProps = (state) => ({
  location: state.location
})

module.exports = connect(mapStateToProps)(App)
