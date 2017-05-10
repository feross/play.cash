const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Link = (props) => {
  const {
    href = '#',
    color = 'blue',
    onClick = () => {}
  } = props

  const cls = color !== 'inherit'
    ? `${color} hover-light-${color}`
    : 'color-inherit hover-inherit'

  return (
    <a
      class={c('link', cls, props.class)}
      href={href}
      onClick={e => {
        if (href === '#') e.preventDefault()
        onClick()
      }}
    >
      {props.children}
    </a>
  )
}

module.exports = Link
