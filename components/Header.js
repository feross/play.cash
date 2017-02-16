const { Component, h } = require('preact') /** @jsx h */

const config = require('../config')

const Button = require('./Button')

class Header extends Component {
  render (props) {
    let $login
    if (props.userName) {
      $login = (
        <Button
          pill
          fill
          color='purple'
          href='/auth/twitter/logout'
          class='mb0'
        >
          Logout ({props.userName})
        </Button>
      )
    } else {
      $login = (
        <Button
          pill
          fill
          color='gold'
          href='/auth/twitter'
        >
          Login with Twitter
        </Button>
      )
    }

    return (
      <header id='header' class='top-0 w-100 bg-purple'>
        <div class='mw8 center pv3 ph3-ns flex flex-wrap flex-column flex-row-ns justify-between-ns items-center'>
          <h1 id='logo' class='ma0'>
            <a class='link white' href='/'>{config.name}</a>
          </h1>
          <nav>
            {$login}
          </nav>
        </div>
      </header>
    )
  }
}

module.exports = Header
