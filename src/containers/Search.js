const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const store = require('../store')

class Search extends Component {
  constructor (props) {
    super(props)
    this._onInput = this._onInput.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
    this._onFocus = this._onFocus.bind(this)
  }

  render (props) {
    const value = this._getStoreValue()

    return (
      <input
        type='text'
        class={c(
          'input-reset ba b--black-20 ph3 pv2 br-pill outline-0 db',
          props.class
        )}
        spellCheck='false'
        placeholder={'Search for an Artist, Song, or Album'}
        value={value}
        onInput={this._onInput}
        onKeyPress={this._onKeyPress}
        onFocus={this._onFocus}
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

  _onInput (e) {
    const inputValue = this._getInputValue(e)
    const storeValue = this._getStoreValue()
    if (inputValue !== storeValue) this._dispatch(inputValue)
  }

  _onKeyPress (e) {
    if (e.key === 'Enter') {
      const value = this._getInputValue(e)
      if (value.trim() !== '') this._dispatch.value()
    }
  }

  _onFocus (e) {
    const value = this._getInputValue(e)
    if (value.trim() !== '') this._dispatch(value)
  }

  _dispatch (value) {
    store.dispatch('SEARCH_INPUT', value)
  }
}

module.exports = Search
