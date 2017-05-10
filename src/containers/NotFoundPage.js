const { h } = require('preact') /** @jsx h */

const ContentSheet = require('../components/ContentSheet')

const NotFoundPage = (props) => {
  return (
    <ContentSheet>
      <h1>Error – Page Not Found</h1>
    </ContentSheet>
  )
}

module.exports = NotFoundPage
