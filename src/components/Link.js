const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Link = (props) => {
  const {
    href = '#',
    defaultColor = true,
    onClick = () => {}
  } = props

  const colorCls = defaultColor && 'blue hover-light-blue'

  return (
    <a
      class={c('link', colorCls, props.class)}
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
