const { h } = require('preact') /** @jsx h */
const c = require('classnames')

const store = require('../store')
const { getControlsVisible, getCurrentTrack } = require('../store-getters')

const Button = require('../components/Button')
const Image = require('../components/Image')
const Link = require('../components/Link')
const Search = require('./Search')

const Header = (props) => {
  const { location } = store
  const currentTrack = getCurrentTrack()

  let $showVideoButton = null
  if (currentTrack && location.name !== 'track') {
    $showVideoButton = (
      <Button
        fill
        color='blue'
        href={currentTrack.url}
        size='medium'
        class='mb0'
      >
        Show Video
      </Button>
    )
  }

  const cls = getControlsVisible()
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
      <div class='fl w-third v-mid pl1'>
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
      <div class='fl w-two-thirds w-third-m w-third-l v-mid pl4 pr1 ph2-m ph0-l'>
        <Search class='search w-100' />
      </div>
      <nav
        class='fl w-third dn db-m db-l v-mid tr'
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
