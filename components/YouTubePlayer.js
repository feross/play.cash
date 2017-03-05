const { Component, h } = require('preact') /** @jsx h */

const YTPlayer = require('yt-player')

class YouTubePlayer extends Component {
  static get defaultProps () {
    return {
      videoId: null,
      width: 640,
      height: 360,
      playing: false,
      volume: 100,
      playbackRate: 1,
      onError: () => {},
      onUnplayable: () => {},
      onPlaying: () => {},
      onPaused: () => {},
      onDuration: () => {},
      onTimeupdate: () => {}
    }
  }

  constructor (props) {
    super(props)
    this.ref = this.ref.bind(this)
    this.onError = this.onError.bind(this)
    this.onUnplayable = this.onUnplayable.bind(this)
    this.onPlaying = this.onPlaying.bind(this)
    this.onPaused = this.onPaused.bind(this)
    this.onCued = this.onCued.bind(this)
    this.onTimeupdate = this.onTimeupdate.bind(this)
  }

  ref (container) {
    this.container = container
  }

  shouldComponentUpdate (nextProps) {
    const props = this.props
    return (
      props.videoId !== nextProps.videoId ||
      props.width !== nextProps.width ||
      props.height !== nextProps.height ||
      props.playing !== nextProps.playing ||
      props.volume !== nextProps.volume ||
      props.playbackRate !== nextProps.playbackRate
    )
  }

  /**
   * Invoke player methods based on incoming props
   */
  componentWillReceiveProps (nextProps) {
    const { videoId, playing, volume, playbackRate } = this.props

    if (videoId !== nextProps.videoId && nextProps.videoId) {
      if (!this.player) this.createPlayer(nextProps)
      this.player.load(nextProps.videoId)
      this.player.setVolume(nextProps.volume)
      this.player.setPlaybackRate(nextProps.playbackRate)
    }

    if (videoId && !nextProps.videoId) {
      this.player.stop()
    }

    if (videoId && !playing && nextProps.playing) {
      this.player.play()
    }

    if (videoId && playing && !nextProps.playing) {
      this.player.pause()
    }

    if (videoId && volume !== nextProps.volume) {
      this.player.setVolume(nextProps.volume)
    }

    if (videoId && playbackRate !== nextProps.playbackRate) {
      this.player.setPlaybackRate(nextProps.playbackRate)
    }
  }

  componentDidMount () {
    const props = this.props
    this.componentWillReceiveProps(props)
  }

  componentWillUnmount () {
    this.player.destroy()
    this.player = null
  }

  render (props) {
    const { style, width, height, class: className } = props

    return (
      <div style={{ ...style, width, height }} class={className}>
        <div ref={this.ref} />
      </div>
    )
  }

  createPlayer (props) {
    const { playerOpts } = props
    this.player = new YTPlayer(this.elem, {
      width: '100%',
      height: '100%',
      autoplay: props.playing,
      ...playerOpts
    })

    this.player.on('error', this.onError)
    this.player.on('unplayable', this.onUnplayable)
    this.player.on('playing', this.onPlaying)
    this.player.on('paused', this.onPaused)
    this.player.on('cued', this.onCued)
    this.player.on('timeupdate', this.onTimeupdate)
  }

  destroyPlayer () {
    this.player.removeListener('error', this.onError)
    this.player.removeListener('unplayable', this.onUnplayable)
    this.player.removeListener('playing', this.onPlaying)
    this.player.removeListener('paused', this.onPaused)
    this.player.removeListener('cued', this.onCued)
    this.player.removeListener('timeupdate', this.onTimeupdate)
  }

  onError (err) {
    this.props.onError(err)
  }

  onUnplayable () {
    this.props.onUnplayable()
  }

  onPlaying () {
    this.props.onPlaying()
  }

  onPaused () {
    this.props.onPaused()
  }

  onCued () {
    const duration = this.player.getDuration()
    this.props.onDuration(duration)
  }

  onTimeupdate (seconds) {
    this.props.onTimeupdate(seconds)
  }
}

module.exports = YouTubePlayer
