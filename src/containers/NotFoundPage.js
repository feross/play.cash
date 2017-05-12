const { h } = require('preact') /** @jsx h */

const Heading = require('../components/Heading')
const Sheet = require('../components/Sheet')

const NotFoundPage = (props) => {
  return (
    <Sheet>
      <Heading>Error – Page Not Found</Heading>
    </Sheet>
  )
}

module.exports = NotFoundPage
