const { h } = require('preact') /** @jsx h */

const config = require('../../config')
const store = require('../store')

const Button = require('../components/Button')
const Image = require('../components/Image')
const Link = require('../components/Link')
const Search = require('./Search')

const Header = (props) => {
  let $showVideoButton = null
  if (store.player.videoId && (store.location.name !== 'track')) {
    $showVideoButton = (
      <Button
        fill
        color='blue'
        href={store.currentTrackUrl}
        size='medium'
        class='mb0'
      >
        Show Video
      </Button>
    )
  }

  return (
    <header
      id='header'
      class='fixed z-2 top-0 w-100 shadow-1'
      style={{
        backgroundColor: 'rgba(255,65,54, 0.8)'
      }}
    >
      <div class='cf center pv3 ph2 ph3-m ph4-l'>
        <div class='fl w-third v-mid'>
          <Link
            class='logo logo-font white dib'
            color='inherit'
            href='/'
          >
            <Image
              class='absolute'
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
          </Link>
        </div>
        <div class='fl w-third v-mid'>
          <Search class='search w-100' />
        </div>
        <nav
          class='fl w-third v-mid tr'
          style={{
            marginTop: 2
          }}
        >
          {$showVideoButton}
        </nav>
      </div>
    </header>
  )
}

module.exports = Header
