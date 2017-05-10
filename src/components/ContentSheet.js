const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const store = require('../store')

class ContentSheet extends Component {
  constructor (props) {
    super(props)
    this._onClick = this._onClick.bind(this)
  }

  render (props) {
    const cls = store.player.videoId && 'bg-black-40'

    return (
      <div
        class={c('relative mt5 pa4 pb5 min-h-100', cls, props.class)}
        onClick={this._onClick}
      >
        {props.children}
      </div>
    )
  }

  _onClick (e) {
    if (store.currentTrackUrl == null) return
    if (e.target !== e.currentTarget &&
        (!e.target.parentElement || e.target.parentElement !== e.currentTarget)) {
      return
    }
    store.dispatch('LOCATION_PUSH', store.currentTrackUrl)
  }
}

module.exports = ContentSheet
