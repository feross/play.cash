const { Component, h } = require('preact') /** @jsx h */

class Image extends Component {
  constructor (props) {
    super(props)

    this._onLoad = this._onLoad.bind(this)
  }

  componentDidMount () {
    const { src, onLoad } = this.props
    const sources = typeof src === 'string' ? [src] : src

    if (onLoad) {
      this._img = new window.Image()
      this._img.onload = this._onLoad
      this._img.src = sources[0]
    }
  }

  componentWillUnmount () {
    if (this._img) {
      this._img.onload = null
      this._img.src = ''
      this._img = null
    }
  }

  render (props) {
    const {
      src,
      sizes,
      sizeHint,
      alt,
      ...rest
    } = props

    const sources = typeof src === 'string' ? [src] : src

    let srcset = null
    if (sizes) {
      srcset = sources.slice(0, sizes.length)
        .map((source, i) => `${source} ${sizes[i]}w`)
        .join(', ')
    }

    return (
      <img
        src={sources[0]}
        srcset={srcset}
        sizes={sizeHint}
        alt={alt}
        {...rest}
      />
    )
  }

  _onLoad (e) {
    const { onLoad } = this.props
    if (onLoad) onLoad(e)
  }
}

module.exports = Image
