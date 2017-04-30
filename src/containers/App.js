const { h } = require('preact') /** @jsx h */

const store = require('../store')

const Header = require('./Header')
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

  const Page = PAGES[location.name]
  const $page = Page ? <Page /> : <NotFoundPage />

  return (
    <div id='app' class='near-black f5'>
      <Player />
      <Header />
      {$page}
    </div>
  )
}

module.exports = App
