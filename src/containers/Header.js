const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const store = require('../store')

const Button = require('../components/Button')
const Image = require('../components/Image')
const Link = require('../components/Link')
const Search = require('./Search')

const Header = (props) => {
  const { app, location, player, currentTrackUrl } = store

  let $showVideoButton = null
  if (player.videoId && (location.name !== 'track')) {
    $showVideoButton = (
      <Button
        fill
        color='blue'
        href={currentTrackUrl}
        size='medium'
        class='mb0'
      >
        Show Video
      </Button>
    )
  }

  const showHeader = !app.idle || !player.playing || player.buffering ||
    player.fetchingTrack || location.name !== 'track'

  const cls = showHeader
    ? 'animate-slide-in-down animate--fast'
    : 'animate-slide-out-up animate--normal'

  return (
    <header
      id='header'
      class={c('fixed z-2 top-0 w-100 shadow-1 cf ph2 ph3-m ph3-l', cls)}
      style={{
        height: 60,
        paddingTop: 12
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
