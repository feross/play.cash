const { Component, h } = require('preact') /** @jsx h */

const store = require('../store')
const { getAlbum } = require('../store-getters')

const PlayAlbum = require('../components/PlayAlbum')
const ContentSheet = require('../components/ContentSheet')
const Heading = require('../components/Heading')

class ArtistPage extends Component {
  componentDidMount () {
    const { entity } = store
    store.dispatch('FETCH_ARTIST_TOP_ALBUMS', { name: entity.name, limit: 10 })
  }

  render (props) {
    const { entity } = store

    const artist = store.artists[entity.url]

    let $albums = []
    if (artist) {
      $albums = artist.topAlbumUrls
        .map(getAlbum)
        .map(album => <PlayAlbum class='fl w-50 w-25-m w-20-l pa2' album={album} />)
    }

    return (
      <ContentSheet>
        <Heading class='tc'>Top Albums</Heading>
        <div class='cf'>
          {$albums}
        </div>
      </ContentSheet>
    )
  }
}

module.exports = ArtistPage
