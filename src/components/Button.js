const { h } = require('preact') /** @jsx h */
const c = require('classnames')

// const Link = require('./Link') // TODO: convert to use Link

/**
 * Basic Button
 * http://tachyons.io/components/buttons/basic/index.html
 *
 * Pill Button
 * http://tachyons.io/components/buttons/pill/index.html
 */

const Button = (props) => {
  const {
    size = 's',
    fill = false,
    pill = false,
    color = 'blue',
    href,
    onClick = () => {}
  } = props

  let cls = ['link bw2 dib grow']

  if (size === 's') cls.push('f6 ph3 pv2')
  if (size === 'm') cls.push('f5 ph3 pv2')
  if (size === 'l') cls.push('f3 ph4 pv3')

  if (fill) cls.push('white', `bg-${color}`)
  else cls.push('ba', color)

  if (pill) cls.push('br-pill')
  else cls.push('br2')

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

module.exports = Button
