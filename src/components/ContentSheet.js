const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const store = require('../store')

const Sheet = require('./Sheet')

class ContentSheet extends Component {
  constructor () {
    super()
    this._onClick = this._onClick.bind(this)
  }

  render (props) {
    return (
      <div
        class='content-sheet mh3 relative'
        onClick={this._onClick}
      >
        <Sheet class={c('mw9 center', props.class)}>
          {props.children}
        </Sheet>
      </div>
    )
  }

  _onClick () {
    store.dispatch('SHOW_TRACK_PAGE')
  }
}

module.exports = ContentSheet
