const { Component, h } = require('preact') /** @jsx h */
const c = require('classnames')

const FIRST_FACT_OFFSET = 8
const LAST_FACT_OFFSET = 8

const GAP_DURATION = 2
const MINIMUM_DURATION = 6
const SECONDS_PER_CHAR = 1 / 22

const BUBBLE_WIDTH = 450
const AVG_BUBBLE_HEIGHT = 200

class FactsOverlay extends Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.state.timedFacts = this._processFacts(props)
    this.state.currentFactIndex = this._getCurrentFactIndex()
  }

  componentWillReceiveProps (nextProps) {
    const props = this.props

    const updateFacts = props.facts !== nextProps.facts ||
      props.duration !== nextProps.duration ||
      props.width !== nextProps.width ||
      props.height !== nextProps.height

    if (updateFacts) {
      this.setState({
        timedFacts: this._processFacts(nextProps)
      })
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
    const { timedFacts, currentFactIndex } = this.state
    const { time } = props

    if (currentFactIndex === -1) return null

    const timedFact = timedFacts[currentFactIndex]
    const animateCls = timedFact.end - time > GAP_DURATION
      ? 'animate-bounce-in'
      : 'animate-bounce-out'

    let text = timedFact.text

    let $dropCap = null
    if (text[0] === '"') {
      $dropCap = <span class='fact-drop-cap'>&ldquo;</span>
      text = text.slice(1)
    }

    return (
      <div
        class={c('fact fact-font absolute black bg-white lh-copy', animateCls)}
        style={{
          maxWidth: BUBBLE_WIDTH,
          ...timedFact.position
        }}
      >
        {$dropCap}
        {text}
      </div>
    )
  }

  _processFacts (props) {
    const { facts, duration, width, height } = props
    if (!facts || !duration || !width || !height) return []

    let start = FIRST_FACT_OFFSET

    let timedFacts = facts.map(function (fact) {
      const factDuration = MINIMUM_DURATION + fact.length * SECONDS_PER_CHAR
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
      return timedFact.end < duration - LAST_FACT_OFFSET
    })

    return timedFacts
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
  const maxLeft = 25
  const maxRight = width - 25 - BUBBLE_WIDTH
  const centerLeft = Math.max(maxLeft, (width / 2) - BUBBLE_WIDTH * 1.50)
  const centerRight = Math.min(maxRight, (width / 2) + BUBBLE_WIDTH * 0.50)

  const maxTop = 75
  const maxBottom = height - 50 - AVG_BUBBLE_HEIGHT
  const centerTop = Math.max(maxTop, height / 2 - AVG_BUBBLE_HEIGHT * 1.10)
  const centerBottom = Math.min(maxBottom, height / 2 + AVG_BUBBLE_HEIGHT * 0.10)

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
