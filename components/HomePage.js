const { Component, h } = require('preact') /** @jsx h */

const Sheet = require('./Sheet')

class HomePage extends Component {
  render (props) {
    const state = props.state
    return (
      <main id='main' class='mw8 mt3 ma-100 center'>
        <Sheet class='tc'>
          <h1 class='f1'>{state.title} - {state.artist}</h1>
        </Sheet>
      </main>
    )
  }
}

/*
  <Button
    pill
    fill
    color='gold'
    size='l'
    href='/auth/twitter'
    class='mb2'
  >
    Login with Twitter
  </Button>
*/

module.exports = HomePage
