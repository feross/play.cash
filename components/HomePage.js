const { Component, h } = require('preact') /** @jsx h */

const Sheet = require('./Sheet')
const YouTubePlayer = require('./YouTubePlayer')

class HomePage extends Component {
  render (props) {
    const { current, player } = props.store
    return (
      <main id='main' class='mw8 mt3 ma-100 center'>
        <YouTubePlayer
          videoId={player.videoId}
          playing={player.playing}
          volume={player.volume}
          playbackRate={player.playbackRate}
          width={player.width}
          height={player.height}
          captions={false}
          controls={false}
          fullscreen={false}
          annotations={false}
          related={false}
          info={false}
          autoplay
          modestBranding
          onError={() => console.log('onError')}
          onUnplayable={() => console.log('onUnplayable')}
          onPlaying={() => console.log('onPlaying')}
          onPaused={() => console.log('onPaused')}
          onDuration={() => console.log('onDuration')}
          onTimeupdate={() => console.log('onTimeupdate')}
        />
        <Sheet class='tc'>
          <h1 class='f1'>{current.track} - {current.artist}</h1>
        </Sheet>
      </main>
    )
  }
}

module.exports = HomePage
