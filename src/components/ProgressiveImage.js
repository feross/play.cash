const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const Image = require('./Image')

class ProgressiveImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      thumbLoaded: false,
      finalLoading: false,
      finalLoaded: false
    }
    this._onThumbLoad = this._onThumbLoad.bind(this)
    this._onFinalLoad = this._onFinalLoad.bind(this)
  }

  componentDidMount () {
    ProgressiveImage.thumbLoading += 1
  }

  render (props) {
    const { src, sizes, sizeHint, alt } = props

    const sources = typeof src === 'string' ? [src] : src
    const srcset = sizes
      ? sources.slice(0, sizes.length).map((source, i) => `${source} ${sizes[i]}w`).join(', ')
      : null

    const thumbSource = sources[0]

    let images = []
    if (!this.state.finalLoaded) {
      images.push(
        <Image
          src={thumbSource}
          alt={alt}
          class={props.class}
          onLoad={this._onThumbLoad}
          onError={this._onThumbLoad}
        />
      )
    }

    if (this.state.thumbLoaded && this.state.finalLoading) {
      images.push(
        <Image
          src={sources[0]}
          srcset={srcset}
          sizes={sizeHint}
          alt={alt}
          class={c({
            clip: !this.state.finalLoaded
          }, props.class)}
          onLoad={this._onFinalLoad}
        />
      )
    }

    return <div>{images}</div>
  }

  _onThumbLoad () {
    ProgressiveImage.thumbLoading -= 1
    if (ProgressiveImage.thumbLoading === 0) {
      ProgressiveImage.callbacks.forEach(cb => cb())
      ProgressiveImage.callbacks = []
    }

    const finalLoading = ProgressiveImage.thumbLoading === 0

    if (!finalLoading) {
      ProgressiveImage.callbacks.push(() => {
        this.setState({ finalLoading: true })
      })
    }

    this.setState({
      thumbLoaded: true,
      finalLoading: finalLoading
    })
  }

  _onFinalLoad () {
    this.setState({ finalLoaded: true })
  }
}

ProgressiveImage.thumbLoading = 0
ProgressiveImage.callbacks = []

module.exports = ProgressiveImage
