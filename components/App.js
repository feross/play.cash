const { Component, h } = require('preact') /** @jsx h */

// const url = require('url')

const Footer = require('./Footer')
const Header = require('./Header')

const HomePage = require('./HomePage')
// const ErrorPage = require('./ErrorPage')

// const routes = {
//   '/': HomePage,
//   '/create': CreatePage
// }

class App extends Component {
  render (props) {
    // const parsedUrl = url.parse(props.state.url)
    // const PageName = routes

    const state = props.state
    return (
      <div id='app' class='near-black f5'>
        <Header userName={state.userName} />
        <HomePage state={state} />
        <Footer />
      </div>
    )
  }
}
          // <ErrorPage default type='404' />

module.exports = App
