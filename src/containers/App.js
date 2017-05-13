const { Component, h } = require('preact') /** @jsx h */
const throttle = require('throttleit')

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

class App extends Component {
  constructor (props) {
    super(props)
    this._onResizeThrottled = throttle(this._onResize.bind(this), 500)
  }

  componentWillMount () {
    this._onResize()
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResizeThrottled)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._onResizeThrottled)
  }

  render (props) {
    const { location, entity } = store

    const Page = PAGES[location.name] || PAGES['not-found']

    const title = store.app.title
      ? store.app.title + ' – ' + config.name
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

  _onResize () {
    const width = window.innerWidth
    const height = window.innerHeight
    store.dispatch('APP_RESIZE', { width, height })
  }
}

module.exports = App
