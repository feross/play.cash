const { Component, h } = require('preact') /** @jsx h */
const { connect } = require('preact-redux')

const Sheet = require('../components/Sheet')
const Input = require('../components/Input')

class HomePage extends Component {
  render (props) {
    const { current } = props
    return (
      <main id='main' class='relative mw8 mt6 ma-100 center'>
        <Sheet class='tc'>
          <h1 class='f1'>{current.track} - {current.artist}</h1>
          <Input
            placeholder='Defend Gotham'
          />
        </Sheet>
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  current: state.current
})

module.exports = connect(mapStateToProps)(HomePage)
