const { h } = require('preact') /** @jsx h */

const Image = (props) => {
  const { src, sizes, sizeHint, alt } = props

  const sources = typeof src === 'string' ? [src] : src
  const srcset = sizes
    ? sources.slice(0, sizes.length).map((source, i) => `${source} ${sizes[i]}w`).join(', ')
    : null

  return (
    <img
      src={sources[0]}
      srcset={srcset}
      sizes={sizeHint}
      alt={alt}
      class={props.class}
    />
  )
}

module.exports = Image
