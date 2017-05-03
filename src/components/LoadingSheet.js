// TODO: delay actually rendering the heart for 250ms to prevent flash

const { h } = require('preact') /** @jsx h */

const ContentSheet = require('./ContentSheet')
const Heading = require('./Heading')
const Image = require('./Image')

const LoadingSheet = (props) => {
  return (
    <ContentSheet class='tc'>
      <Heading class='pl3'>Loading...</Heading>
      <Image class='o-80' src='/img/heart.svg' alt='Loading...' />
    </ContentSheet>
  )
}

module.exports = LoadingSheet
