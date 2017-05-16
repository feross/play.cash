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

const APP_IDLE_TIMEOUT = 3000

class App extends Component {
  constructor (props) {
    super(props)
    this._onVisibilityChange = this._onVisibilityChange.bind(this)
    this._onResizeThrottled = throttle(this._onResize.bind(this), 500)
    this._onMouseMoveThrottled = throttle(this._onMouseMove.bind(this), 500)
  }

  componentWillMount () {
    this._onVisibilityChange()
    this._onResize()
    this._onMouseMove()
  }

  componentDidMount () {
    window.addEventListener('visibilitychange', this._onVisibilityChange)
    window.addEventListener('resize', this._onResizeThrottled)
    window.addEventListener('mousemove', this._onMouseMoveThrottled)
  }

  componentWillUnmount () {
    window.removeEventListener('visibilitychange', this._onVisibilityChange)
    window.removeEventListener('resize', this._onResizeThrottled)
    window.removeEventListener('mousemove', this._onMouseMoveThrottled)
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

  _onVisibilityChange () {
    const hidden = document.hidden
    store.dispatch('APP_HIDDEN', hidden)
  }

  _onResize () {
    const width = window.innerWidth
    const height = window.innerHeight
    store.dispatch('APP_RESIZE', { width, height })
  }

  _onMouseMove () {
    if (store.app.idle) {
      store.dispatch('APP_IDLE', false)
    }

    clearInterval(this._inactiveTimeout)
    this._inactiveTimeout = setTimeout(this._onInactive, APP_IDLE_TIMEOUT)
  }

  _onInactive () {
    store.dispatch('APP_IDLE', true)
  }
}

module.exports = App
