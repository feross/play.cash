const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const store = require('../store')

class ContentSheet extends Component {
  constructor (props) {
    super(props)
    this._onClick = this._onClick.bind(this)
  }

  render (props) {
    return (
      <div
        class={c('relative pb5 ph4 min-vh-100 bg-black-40', props.class)}
        style={{ paddingTop: '6.5rem' }}
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
