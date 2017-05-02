const { h } = require('preact') /** @jsx h */

const store = require('../store')

const Header = require('../components/Header')
const Player = require('./Player')
// const Footer = require('../components/Footer')

const HomePage = require('./HomePage')
const TrackPage = require('./TrackPage')
const NotFoundPage = require('./NotFoundPage')

const PAGES = {
  'home': HomePage,
  'track': TrackPage,
  'not-found': NotFoundPage
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
