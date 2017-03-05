const { Component, h } = require('preact') /** @jsx h */

const Sheet = require('./Sheet')
const Input = require('./Input')

class HomePage extends Component {
  render (props) {
    const { current } = props
    return (
      <main id='main' class='relative mw8 mt6 ma-100 center'>
        <Sheet class='tc'>
          <h1 class='f1'>{current.track} - {current.artist}</h1>
          <Input
            placeholder='Defend Gotham'
          />
        </Sheet>
      </main>
    )
  }
}

module.exports = HomePage
