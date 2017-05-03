const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Link = (props) => {
  const {
    href = '#',
    defaultStyle = true,
    onClick = () => {}
  } = props

  const cls = defaultStyle && 'link blue hover-light-blue'

  return (
    <a
      class={c(cls, props.class)}
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
