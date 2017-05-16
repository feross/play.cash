const { h } = require('preact') /** @jsx h */
const c = require('classnames')

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

  const showHeader = !store.app.idle || store.location.name !== 'track' ||
    !store.player.playing || store.player.buffering

  const cls = showHeader
    ? 'animate animate--slide-in-down'
    : 'animate animate--slide-out-up'

  return (
    <header
      id='header'
      class={c('fixed z-2 top-0 w-100 shadow-1 cf ph2 ph3-m ph4-l', cls)}
      style={{
        height: 60,
        paddingTop: 12,
        backgroundColor: 'rgba(255,65,54, 0.8)'
      }}
    >
      <div class='fl w-third v-mid'>
        <Link
          class='dib'
          href='/'
        >
          <Image
            style={{
              height: 40,
              marginTop: -1
            }}
            alt='Play'
            src='/img/logo.svg'
          />
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
    </header>
  )
}

module.exports = Header
