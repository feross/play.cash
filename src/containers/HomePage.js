const { Component, h } = require('preact') /** @jsx h */

const Input = require('../components/Input')
const Sheet = require('../components/Sheet')

class HomePage extends Component {
  render (props) {
    return (
      <div id='home-page'>
        <Sheet class='tc relative mw8 mt6 ma-100 center'>
          <Input
            placeholder='Defend Gotham'
          />
        </Sheet>
      </div>
    )
  }
}

module.exports = HomePage
