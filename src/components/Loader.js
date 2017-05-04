// TODO: delay actually rendering the heart for 250ms to prevent flash

const { h } = require('preact') /** @jsx h */

const Image = require('./Image')

const Loader = (props) => {
  return (
    <div class='tc mt3'>
      <Image class='rotate-180' src='/img/triangle.svg' alt='Loading...' />
    </div>
  )
}

module.exports = Loader
