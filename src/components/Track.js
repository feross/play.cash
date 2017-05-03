const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Link = require('./Link')

const Track = (props) => {
  const { name, artistName, href } = props

  return (
    <Link
      class={c('db pa3 bb b--light-silver black-80 hover-bg-lightest-blue', props.class)}
      defaultColor={false}
      href={href}
    >
      <i class='material-icons fl nt1 nl1'>play_arrow</i>
      <span class='ml2'>{name}</span>
      <span class='pl2 black-40'>{artistName}</span>
    </Link>
  )
}

module.exports = Track
