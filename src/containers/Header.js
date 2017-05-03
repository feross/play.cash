const { h } = require('preact') /** @jsx h */

const config = require('../../config')
const store = require('../store')

const Button = require('../components/Button')
const Input = require('../components/Input')

const Header = (props) => {
  let $showVideoButton = null
  if (store.player.videoId && (!store.entity || store.entity.type !== 'track')) {
    $showVideoButton = (
      <Button
        pill
        fill
        color='purple'
        href={store.currentTrackUrl}
        class='mb0'
      >
        Show Video
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
          {$showVideoButton}
        </nav>
      </div>
    </header>
  )
}

module.exports = Header
