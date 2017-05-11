// TODO: delay actually rendering the heart for 250ms to prevent flash

const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Image = require('./Image')

const Loader = (props) => {
  let style = props.style

  if (props.center) {
    style = Object.assign({
      marginTop: 'calc(50vh - 100px)'
    }, style)
  }

  return (
    <div
      class={c('tc mt3', props.class)}
      style={style}
    >
      <Image class='rotate-180' src='/img/triangle.svg' alt='Loading...' />
    </div>
  )
}

module.exports = Loader
