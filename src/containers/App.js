const { h } = require('preact') /** @jsx h */

const store = require('../store')

const Header = require('../containers/Header')
const Player = require('./Player')
// const Footer = require('../components/Footer')

const HomePage = require('./HomePage')
const ArtistPage = require('./ArtistPage')
const TrackPage = require('./TrackPage')
const AlbumPage = require('./AlbumPage')
const NotFoundPage = require('./NotFoundPage')

const PAGES = {
  'home': HomePage,
  'artist': ArtistPage,
  'track': TrackPage,
  'album': AlbumPage,
  'not-found': NotFoundPage
}

const App = (props) => {
  const { location } = store

  const Page = PAGES[location.name] || PAGES['not-found']

  return (
    <div id='app' class='black-90 f5'>
      <Player />
      <Header />
      <Page />
    </div>
  )
}

module.exports = App
