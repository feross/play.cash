const { h } = require('preact') /** @jsx h */

const store = require('../store')

const YouTubePlayer = require('../components/YouTubePlayer')

const PLAYER_OPTS = {
  captions: true,
  controls: false,
  fullscreen: false,
  annotations: false,
  related: false,
  info: false,
  modestBranding: true
}

const Player = (props) => {
  const { player } = store
  return (
    <div id='player' class='fixed top-0'>
      <YouTubePlayer
        videoId={player.videoId}
        playing={player.playing}
        volume={player.volume}
        playbackRate={player.playbackRate}
        width={player.width}
        height={player.height}
        playerOpts={PLAYER_OPTS}
        onError={() => console.log('onError')}
        onUnplayable={() => console.log('onUnplayable')}
        onPlaying={() => console.log('onPlaying')}
        onPaused={() => console.log('onPaused')}
        onDuration={() => console.log('onDuration')}
        onTimeupdate={() => console.log('onTimeupdate')}
      />
    </div>
  )
}

module.exports = Player
