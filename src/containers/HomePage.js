const { Component, h } = require('preact') /** @jsx h */
const { connect } = require('preact-redux')

const Input = require('../components/Input')
const Sheet = require('../components/Sheet')

class HomePage extends Component {
  render (props) {
    // const { current, location } = props
    return (
      <div id='home-page'>
        <Sheet class='tc relative mw8 mt6 ma-100 center'>
          <Input
            placeholder='Defend Gotham'
          />
        </Sheet>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // location: state.location,
  // current: state.current
})

module.exports = connect(mapStateToProps)(HomePage)
