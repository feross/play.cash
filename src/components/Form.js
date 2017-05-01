const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Form = (props) => {
  const { label } = props

  const $label = label
    ? <legend class='f3 fw6 ph0 mh0'>{label}</legend>
    : null

  return (
    <form class={c('pv2 black-80 tl measure', props.class)}>
      {$label}
      {props.children}
    </form>
  )
}

module.exports = Form
