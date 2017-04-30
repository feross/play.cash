const { h } = require('preact') /** @jsx h */

const c = require('classnames')

const Heading = (props) => {
  return (
    <h2 class={c('fw4 pv0 mv3', props.class)}>
      {props.children}
    </h2>
  )
}

module.exports = Heading
