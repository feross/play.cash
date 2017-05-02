const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Image = require('./Image')
const Link = require('./Link')

const Artist = (props) => {
  const { name, href, images, sizes, sizeHint } = props

  return (
    <Link href={href} class={c('db link dim tc', props.class)}>
      <Image
        class='w-100 db ba b--black-10 br4'
        src={images}
        sizes={sizes}
        sizeHint={sizeHint}
        alt={name + ' Image'}
      />
      <dl class='mt2 f6 lh-copy'>
        <dt class='clip'>Title</dt>
        <dd class='ml0 black truncate w-100'>{name}</dd>
      </dl>
    </Link>
  )
}

module.exports = Artist
