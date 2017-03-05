const { h } = require('preact') /** @jsx h */

const c = require('classnames')

const Link = (props) => {
  const { href = '#', children, onClick, class: className } = props

  return (
    <a
      class={c('blue hover-light-blue link', className)}
      href={href}
      onClick={e => {
        if (href === '#') e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}

module.exports = Link
