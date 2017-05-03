const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Sheet = require('./Sheet')

const ContentSheet = (props) => {
  return (
    <div class='content-sheet mh3 relative'>
      <Sheet class={c('mw8 center', props.class)}>
        {props.children}
      </Sheet>
    </div>
  )
}

module.exports = ContentSheet
