const { Component, h } = require('preact') /** @jsx h */

// const Footer = require('./Footer')
const Header = require('./Header')
const HomePage = require('./HomePage')
const Player = require('./Player')

class App extends Component {
  render (props) {
    const store = props.store
    return (
      <div id='app' class='near-black f5'>
        <Player player={store.player} />
        <Header userName={store.userName} />
        <HomePage current={store.current} />
      </div>
    )
  }
}

module.exports = App
