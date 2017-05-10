const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const Image = require('./Image')

class ProgressiveImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      thumbLoaded: false,
      finalLoading: false
    }

    this._onThumbLoad = this._onThumbLoad.bind(this)
  }

  componentDidMount () {
    ProgressiveImage.thumbLoading += 1
  }

  componentWillUnmount () {
    this.elem = null
  }

  render (props) {
    const { src, sizes, sizeHint, alt } = props

    const sources = typeof src === 'string' ? [src] : src

    let $finalImage = null
    if (this.state.thumbLoaded && this.state.finalLoading) {
      $finalImage = (
        <Image
          class={c('absolute top-0', props.class)}
          style={props.style}
          src={sources}
          sizes={sizes}
          sizeHint={sizeHint}
          alt={alt}
        />
      )
    }

    return (
      <div
        class={c('relative', props.containerClass)}
      >
        <Image
          class={c(props.class)}
          style={props.style}
          src={sources[0]}
          alt={alt}
          onLoad={this._onThumbLoad}
        />
        {$finalImage}
      </div>
    )
  }

  _onThumbLoad () {
    if (this.state.thumbLoaded) return

    ProgressiveImage.thumbLoading -= 1

    const finalLoading = ProgressiveImage.thumbLoading === 0

    if (finalLoading) {
      ProgressiveImage.callbacks.forEach(cb => cb())
      ProgressiveImage.callbacks = []
    } else {
      ProgressiveImage.callbacks.push(() => {
        this.setState({ finalLoading: true })
      })
    }

    this.setState({ thumbLoaded: true, finalLoading })
  }
}

ProgressiveImage.thumbLoading = 0
ProgressiveImage.callbacks = []

module.exports = ProgressiveImage
