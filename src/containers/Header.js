const { h } = require('preact') /** @jsx h */

const config = require('../../config')
const store = require('../store')

const Button = require('../components/Button')
const Image = require('../components/Image')
const Search = require('./Search')

const Header = (props) => {
  let $showVideoButton = null
  if (store.player.videoId && (store.location.name !== 'track')) {
    $showVideoButton = (
      <Button
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
    <header id='header' class='fixed z-1 top-0 w-100 bg-red o-90 shadow-1'>
      <div class='cf mw9 center pv3 ph1 ph3-ns'>
        <div class='fl w-third v-mid'>
          <a class='logo logo-font db no-underline white' href='/'>
            <Image
              class='absolute db'
              style={{
                width: 46,
                marginTop: -3,
                marginLeft: -3
              }}
              src='/img/logo.svg'
            />
            <div
              style={{
                fontSize: 32,
                marginLeft: 55
              }}
            >
              {config.name}
            </div>
          </a>
        </div>
        <div class='fl w-third v-mid'>
          <Search class='search w-100' />
        </div>
        <nav class='fl w-third v-mid tr'>
          {$showVideoButton}
        </nav>
      </div>
    </header>
  )
}

module.exports = Header
