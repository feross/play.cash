const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const Image = require('./Image')

class ProgressiveImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      thumbLoaded: false
    }

    this.handleThumbLoad = this.handleThumbLoad.bind(this)
  }

  render (props) {
    const { src, sizes, sizeHint, alt } = props

    const sources = typeof src === 'string' ? [src] : src

    let $finalImage = null
    if (this.state.thumbLoaded) {
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
          onLoad={this.handleThumbLoad}
        />
        {$finalImage}
      </div>
    )
  }

  handleThumbLoad () {
    this.setState({ thumbLoaded: true })
  }
}

module.exports = ProgressiveImage
