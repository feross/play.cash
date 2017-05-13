const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const FACT_OFFSET = 8 // Offset at beginning/end of video during which no facts are shown
const FACT_GAP = 0.8 // Time to wait between facts

const BASE_DURATION = 3
const SECONDS_PER_CHAR = 1 / 20

const BUBBLE_WIDTH = 450
const BUBBLE_HEIGHT = 125 // Actual height depends on text (this is just an estimate)
const BUBBLE_HORIZ_OFFSET = 25
const BUBBLE_VERT_OFFSET = 100

class FactsOverlay extends Component {
  constructor (props) {
    super(props)

    this.state = {}
    const { speedFactor, timedFacts } = this._processFacts(props)
    this.state.speedFactor = speedFactor
    this.state.timedFacts = timedFacts
    this.state.currentFactIndex = this._getCurrentFactIndex()
  }

  componentWillReceiveProps (nextProps) {
    const props = this.props

    const updateFacts = props.facts !== nextProps.facts ||
      props.duration !== nextProps.duration ||
      props.width !== nextProps.width ||
      props.height !== nextProps.height

    if (updateFacts) {
      const { speedFactor, timedFacts } = this._processFacts(nextProps)
      this.setState({ speedFactor, timedFacts })
    }

    if (updateFacts || props.time !== nextProps.time) {
      const prevFactIndex = this.state.currentFactIndex
      const currentFactIndex = this._getCurrentFactIndex()
      this.setState({ currentFactIndex })
      if (currentFactIndex !== prevFactIndex && currentFactIndex !== -1) {
        this._playSound()
      }
    }
  }

  render (props) {
    const { timedFacts, speedFactor, currentFactIndex } = this.state
    const { time } = props

    if (currentFactIndex === -1) return null

    const timedFact = timedFacts[currentFactIndex]
    const animateCls = timedFact.end - time > FACT_GAP * (1 / speedFactor)
      ? 'animate-bounce-in'
      : 'animate-bounce-out'

    let text = timedFact.text

    let $dropCap = null
    if (text[0] === '"') {
      $dropCap = <span class='fact-quote'>&ldquo;</span>
      text = text.slice(1)
    }

    return (
      <div
        class={c('fact fact-font absolute black bg-white-90 lh-title', animateCls)}
        style={{
          maxWidth: BUBBLE_WIDTH,
          ...timedFact.position
        }}
      >
        {$dropCap}
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    )
  }

  _processFacts (props) {
    const { facts, duration, width, height } = props
    if (!facts || !duration || !width || !height) {
      return { speedFactor: 1, timedFacts: [] }
    }

    // Adjust fact duration up or down slightly so that facts fit the video duration better
    const totalFactDuration = facts.reduce((acc, fact) => acc + getFactDuration(fact), 0)

    const speedFactor = Math.max(
      0.80,
      Math.min(
        1.3,
        totalFactDuration / (duration - (FACT_OFFSET * 2))
      )
    )

    function getFactDuration (fact) {
      return BASE_DURATION + (fact.length * SECONDS_PER_CHAR)
    }

    let start = FACT_OFFSET

    let timedFacts = facts.map(function (fact) {
      const factDuration = getFactDuration(fact) * (1 / speedFactor)
      const timedFact = {
        text: fact,
        duration: factDuration,
        start: start,
        end: start + factDuration,
        position: getFactPosition(fact, width, height)
      }
      start += factDuration
      return timedFact
    })

    // Remove facts which appear *after* the video ends
    timedFacts = timedFacts.filter(function (timedFact) {
      return timedFact.end <= duration - FACT_OFFSET + 1
    })

    return { speedFactor, timedFacts }
  }

  _getCurrentFactIndex () {
    const { time } = this.props
    if (time == null) return -1

    const index = this.state.timedFacts.findIndex(function (timedFact) {
      return timedFact.start <= time && time < timedFact.end
    })

    return index
  }

  _playSound () {
    const audio = new window.Audio('/pop.mp3')
    audio.volume = 0.1
    audio.play()
  }
}

function getFactPosition (factText, width, height) {
  const maxLeft = BUBBLE_HORIZ_OFFSET
  const maxRight = width - BUBBLE_HORIZ_OFFSET - BUBBLE_WIDTH
  const centerLeft = Math.max(maxLeft, (width / 2) - BUBBLE_WIDTH * 1.50)
  const centerRight = Math.min(maxRight, (width / 2) + BUBBLE_WIDTH * 0.50)

  const maxTop = BUBBLE_VERT_OFFSET
  const maxBottom = height - BUBBLE_VERT_OFFSET - BUBBLE_HEIGHT
  const centerTop = Math.max(maxTop, height / 2 - BUBBLE_HEIGHT * 1.10)
  const centerBottom = Math.min(maxBottom, height / 2 + BUBBLE_HEIGHT * 0.10)

  const left = random(0, 1, factText)
    ? random(maxLeft, centerLeft, factText)
    : random(centerRight, maxRight, factText)

  const top = random(0, 2, factText + '1')
    ? random(maxTop, centerTop, factText)
    : random(centerBottom, maxBottom, factText)

  return {
    left: left,
    top: top
  }
}

function random (min, max, seed) {
  const rng = Math.random
  return min + Math.floor(rng() * (max - min + 1))
}

module.exports = FactsOverlay
