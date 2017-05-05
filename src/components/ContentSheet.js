const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const store = require('../store')

const Sheet = require('./Sheet')

class ContentSheet extends Component {
  constructor (props) {
    super(props)
    this._onClick = this._onClick.bind(this)
  }

  render (props) {
    const cls = store.player.videoId
      ? 'bg-white-40'
      : 'bg-white-80'

    return (
      <div
        class='content-sheet mt5 pa4 relative'
        onClick={this._onClick}
      >
        <Sheet class={c('mw9 center', cls, props.class)}>
          {props.children}
        </Sheet>
      </div>
    )
  }

  _onClick (e) {
    if (e.target.classList.contains('content-sheet')) {
      store.dispatch('LOCATION_PUSH', store.currentTrackUrl)
    }
  }
}

module.exports = ContentSheet
