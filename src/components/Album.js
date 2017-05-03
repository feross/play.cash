const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Image = require('./Image')
const Link = require('./Link')

const Album = (props) => {
  const {
    name,
    artistName,
    href,
    images,
    sizes,
    sizeHint,
    simple
  } = props

  const $image = (
    <Image
      class='w-100 db ba b--black-10'
      src={images}
      sizes={sizes}
      sizeHint={sizeHint}
      alt={artistName + ' ' + name + ' Album Cover'}
    />
  )

  if (simple) {
    return (
      <div class={props.class}>
        {$image}
      </div>
    )
  }

  return (
    <Link
      href={href}
      class={c('db no-underline grow tc', props.class)}
      defaultStyle={false}
    >
      {$image}
      <dl class='mt2 f6 lh-copy'>
        <dt class='clip'>Title</dt>
        <dd class='ml0 black truncate w-100'>{name}</dd>
        <dt class='clip'>Artist</dt>
        <dd class='ml0 gray truncate w-100'>{artistName}</dd>
      </dl>
    </Link>
  )
}

module.exports = Album
