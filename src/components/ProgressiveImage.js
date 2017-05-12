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
    if (!this.state.thumbLoaded) this._decrementCounter()
    this.setState({ thumbLoaded: true })
  }

  render (props) {
    const { src, sizes, sizeHint, alt } = props

    const sources = typeof src === 'string' ? [src] : src

    let $finalImage = null
    if (this.state.thumbLoaded && this.state.finalLoading) {
      $finalImage = (
        <Image
          class={c('db w-100 absolute top-0', props.imageClass)}
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
        class={c('relative', props.class)}
      >
        <Image
          class={c('db w-100', props.imageClass)}
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

    this._decrementCounter()
    this.setState({ thumbLoaded: true })

    if (ProgressiveImage.thumbLoading === 0) {
      this.setState({ finalLoading: true })
    } else {
      ProgressiveImage.callbacks.push(() => {
        this.setState({ finalLoading: true })
      })
    }
  }

  _decrementCounter () {
    ProgressiveImage.thumbLoading -= 1
    if (ProgressiveImage.thumbLoading === 0) {
      ProgressiveImage.callbacks.forEach(cb => cb())
      ProgressiveImage.callbacks = []
    }
  }
}

ProgressiveImage.thumbLoading = 0
ProgressiveImage.callbacks = []

module.exports = ProgressiveImage
