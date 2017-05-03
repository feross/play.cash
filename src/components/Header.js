const { h } = require('preact') /** @jsx h */

const config = require('../../config')

const Button = require('./Button')
const Input = require('./Input')

const Header = (props) => {
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
    <header id='header' class='fixed z-1 top-0 w-100 bg-gold o-90 shadow-1'>
      <div class='mw8 center pv3 ph1 ph3-ns flex flex-wrap flex-column flex-row-ns justify-between-ns items-center'>
        <h1 id='logo' class='ma0'>
          <a class='link white' href='/'>{config.name}</a>
        </h1>
        <div class='search'>
          <Input
            placeholder='Search for Songs, Artists, or Albums...'
          />
        </div>
        <nav>
          {$login}
        </nav>
      </div>
    </header>
  )
}

module.exports = Header
