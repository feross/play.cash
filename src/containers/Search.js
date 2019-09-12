const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const store = require('../store')

class Search extends Component {
  constructor (props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  render (props) {
    const value = this._getStoreValue()

    let placeholder = 'Search for an Artist, Song, or Album'
    if (store.app.width < 1000) {
      placeholder = 'Search for music'
    }
    if (store.app.width < 600) {
      placeholder = 'Search'
    }

    return (
      <input
        type='text'
        class={c(
          'input-reset ba b--black-20 ph3 pv2 br-pill outline-0 db',
          props.class
        )}
        spellCheck='false'
        placeholder={placeholder}
        value={value}
        onInput={this.handleInput}
        onKeyPress={this.handleKeyPress}
        onFocus={this.handleFocus}
      />
    )
  }

  _getStoreValue () {
    const { entity } = store

    return (entity && entity.type === 'search')
      ? entity.q
      : store.lastSearch
  }

  _getInputValue (e) {
    return e.target.value
  }

  handleInput (e) {
    const inputValue = this._getInputValue(e)
    const storeValue = this._getStoreValue()
    if (inputValue !== storeValue) this._dispatch(inputValue)
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      const value = this._getInputValue(e)
      if (value.trim() !== '') this._dispatch(value)
    }
    e.stopPropagation()
  }

  handleFocus (e) {
    const value = this._getInputValue(e)
    if (value.trim() !== '') this._dispatch(value)
  }

  _dispatch (value) {
    store.dispatch('SEARCH_INPUT', value)
  }
}

module.exports = Search
