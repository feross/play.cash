const { h } = require('preact') /** @jsx h */

const store = require('../store')
const config = require('../../config')

// const Footer = require('./Footer') TODO
const Header = require('./Header')
const Player = require('./Player')
const Title = require('../components/Title')

// Pages
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
  const { location, entity } = store

  const Page = PAGES[location.name] || PAGES['not-found']

  const title = store.window.title
    ? store.window.title + ' – ' + config.name
    : config.name

  return (
    <div style={{ 'user-select': 'none' }}>
      <Title title={title} />
      <Player />
      <Header />
      <Page entity={entity} />
    </div>
  )
}

module.exports = App
