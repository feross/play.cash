const { h } = require('preact') /** @jsx h */

const config = require('../../config')
const store = require('../store')

const Button = require('../components/Button')
const Search = require('./Search')

const Header = (props) => {
  let $showVideoButton = null
  if (store.player.videoId && (store.location.name !== 'track')) {
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
      <div class='mw9 center pv3 ph1 ph3-ns'>
        <h1 id='logo' class='dib w-third v-mid ma0'>
          <a class='link white' href='/'>{config.name}</a>
        </h1>
        <div class='dib w-third v-mid'>
          <Search
            class='search w-100'
            placeholder='Search for Songs, Artists, or Albums...'
          />
        </div>
        <nav class='dib w-third v-mid tr'>
          {$showVideoButton}
        </nav>
      </div>
    </header>
  )
}

module.exports = Header
