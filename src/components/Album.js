const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Link = require('./Link')

const Album = (props) => {
  const { name, artist, href, image } = props

  return (
    <Link href={href} class={c('db link dim tc', props.class)}>
      <img
        src={image}
        alt={artist + ' ' + name + ' Album Cover'}
        class='w-100 db outline black-20'
      />
      <dl class='mt2 f6 lh-copy'>
        <dt class='clip'>Title</dt>
        <dd class='ml0 black truncate w-100'>{name}</dd>
        <dt class='clip'>Artist</dt>
        <dd class='ml0 gray truncate w-100'>{artist}</dd>
      </dl>
    </Link>
  )
}

module.exports = Album
