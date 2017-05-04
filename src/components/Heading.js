const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Heading = (props) => {
  return (
    <h2 class={c('f3 fw6 pv0 mv3', props.class)}>
      {props.children}
    </h2>
  )
}

module.exports = Heading
