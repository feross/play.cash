const { h } = require('preact') /** @jsx h */

const store = require('../store')

const Header = require('../containers/Header')
const Player = require('./Player')
// const Footer = require('../components/Footer')

const HomePage = require('./HomePage')
const SearchPage = require('./SearchPage')
const ArtistPage = require('./ArtistPage')
const TrackPage = require('./TrackPage')
const AlbumPage = require('./AlbumPage')
const NotFoundPage = require('./NotFoundPage')

const PAGES = {
  'home': HomePage,
  'search': SearchPage,
  'artist': ArtistPage,
  'track': TrackPage,
  'album': AlbumPage,
  'not-found': NotFoundPage
}

const App = (props) => {
  const { location } = store

  const Page = PAGES[location.name] || PAGES['not-found']

  return (
    <div id='app'>
      <Player />
      <Header />
      <Page />
    </div>
  )
}

module.exports = App
