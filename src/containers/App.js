const { Component, h } = require('preact') /** @jsx h */

// const Footer = require('./Footer')
const Header = require('../components/Header')
const HomePage = require('./HomePage')
const Player = require('./Player')

class App extends Component {
  render (props) {
    return (
      <div id='app' class='near-black f5'>
        <Player />
        <Header />
        <HomePage />
      </div>
    )
  }
}

module.exports = App
