const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Link = (props) => {
  const {
    href = '#',
    onClick = () => {}
  } = props

  return (
    <a
      class={c('blue hover-light-blue link', props.class)}
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
