const { h } = require('preact') /** @jsx h */

const Sheet = require('../components/Sheet')

const ContentSheet = (props) => {
  return (
    <div class='content-sheet mh3 relative'>
      <Sheet class='mw9 center'>
        {props.children}
      </Sheet>
    </div>
  )
}

module.exports = ContentSheet
