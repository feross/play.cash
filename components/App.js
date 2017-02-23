const { Component, h } = require('preact') /** @jsx h */

// const url = require('url')

const Footer = require('./Footer')
const Header = require('./Header')

const HomePage = require('./HomePage')

class App extends Component {
  render (props) {
    const store = props.store
    return (
      <div id='app' class='near-black f5'>
        <Header userName={store.userName} />
        <HomePage store={store} />
        <Footer />
      </div>
    )
  }
}

module.exports = App
