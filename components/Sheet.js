const { Component, h } = require('preact') /** @jsx h */

const c = require('classnames')

class Sheet extends Component {
  render (props) {
    return (
      <div class={c('mh2 ph4 pv4 br3 bg-white', props.class)}>
        {props.children}
      </div>
    )
  }
}

module.exports = Sheet
