const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const Sheet = (props) => {
  return (
    <div class={c('mh2 pa4 br3 bg-white-70', props.class)}>
      {props.children}
    </div>
  )
}

module.exports = Sheet
