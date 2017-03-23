const { Component, h } = require('preact') /** @jsx h */
const { connect } = require('preact-redux')

const { fetchTrack } = require('../actions')

const Input = require('../components/Input')
const Sheet = require('../components/Sheet')

class TrackPage extends Component {
  componentDidMount () {
    const { dispatch, currentTrack } = this.props
    dispatch(fetchTrack(currentTrack))
  }

  componentDidUpdate (prevProps) {
    const { dispatch, currentTrack } = this.props
    if (currentTrack !== prevProps.currentTrack) {
      dispatch(fetchTrack(currentTrack))
    }
  }

  render (props) {
    const { currentTrack } = props
    return (
      <div id='home-page'>
        <Sheet class='tc relative mw8 mt6 ma-100 center'>
          <h1 class='f2'>current track: {currentTrack.track} - {currentTrack.artist}</h1>
          <Input
            placeholder='Defend Gotham'
          />
        </Sheet>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentTrack: state.currentTrack
})

module.exports = connect(mapStateToProps)(TrackPage)
