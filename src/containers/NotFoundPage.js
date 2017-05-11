const { h } = require('preact') /** @jsx h */

const Sheet = require('../components/Sheet')

const NotFoundPage = (props) => {
  return (
    <Sheet>
      <h1>Error – Page Not Found</h1>
    </Sheet>
  )
}

module.exports = NotFoundPage
