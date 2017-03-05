const { h } = require('preact') /** @jsx h */

const c = require('classnames')

const Sheet = (props) => (
  <div class={c('mh2 ph4 pv4 br3 bg-white-80', props.class)}>
    {props.children}
  </div>
)

module.exports = Sheet
