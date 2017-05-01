const { h } = require('preact') /** @jsx h */

const store = require('../store')

const Header = require('./Header')
const Player = require('./Player')
// const Footer = require('../components/Footer')

const PAGES = {
  'home': require('./HomePage'),
  'track': require('./TrackPage'),
  'not-found': require('./NotFoundPage')
}

const App = (props) => {
  const { location } = store

  const Page = PAGES[location.name] || PAGES['not-found']

  return (
    <div id='app' class='near-black f5'>
      <Player />
      <Header />
      <Page />
    </div>
  )
}

module.exports = App
