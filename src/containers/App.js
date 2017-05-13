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
    this._onVisibilityChange = this._onVisibilityChange.bind(this)
  }

  componentWillMount () {
    this._onResize()
    this._onVisibilityChange()
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResizeThrottled)
    window.addEventListener('visibilitychange', this._onVisibilityChange)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._onResizeThrottled)
    window.removeEventListener('visibilitychange', this._onVisibilityChange)
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

  _onVisibilityChange () {
    const hidden = document.hidden
    store.dispatch('APP_HIDDEN', hidden)
  }
}

module.exports = App
