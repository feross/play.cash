const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const store = require('../store')
const { getCurrentTrack } = require('../store-getters')

class Sheet extends Component {
  constructor (props) {
    super(props)
    this._onClick = this._onClick.bind(this)
  }

  render (props) {
    return (
      <div
        class={c('relative pb6 ph2 ph3-m ph4-l min-vh-100 bg-black-50', props.class)}
        style={{ paddingTop: '5.6rem' }}
        onClick={this._onClick}
      >
        {props.children}
      </div>
    )
  }

  _onClick (e) {
    const { location } = store
    const currentTrack = getCurrentTrack()

    if (location.name === 'track' || currentTrack == null) return

    if (e.target !== e.currentTarget &&
        (!e.target.parentElement || e.target.parentElement !== e.currentTarget)) {
      return
    }
    store.dispatch('LOCATION_PUSH', currentTrack.url)
  }
}

module.exports = Sheet
