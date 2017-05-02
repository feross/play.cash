const { Component, h } = require('preact') /** @jsx h */

const PlayAlbum = require('../components/PlayAlbum')
const ContentSheet = require('../components/ContentSheet')
const Heading = require('../components/Heading')

class ArtistPage extends Component {
  render (props) {
    return (
      <ContentSheet>
        <Heading class='tc'>Top Albums</Heading>
        <div class='cf'>
          <div class='fl w-50 w-25-m w-20-l pa2'>
            <PlayAlbum
              name='Blonde'
              artist='Frank Ocean'
              images='http://is4.mzstatic.com/image/thumb/Music62/v4/93/8f/75/938f7536-0188-f9ba-4585-0a77ceaebf0a/source/400x40000bb.png'
            />
          </div>
        </div>
      </ContentSheet>
    )
  }
}

module.exports = ArtistPage
