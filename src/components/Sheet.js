const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const store = require('../store')
const { getCurrentTrack } = require('../store-getters')

class Sheet extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  render (props) {
    return (
      <div
        class={c(
          'sheet relative pb4 pb5-m pb6-l ph3 ph3-m ph4-l min-vh-100 bg-black-50',
          props.class
        )}
        onClick={this.handleClick}
      >
        {props.children}
      </div>
    )
  }

  handleClick (e) {
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
