const { Component, h } = require('preact') /** @jsx h */

const entity = require('../entity')
const store = require('../store')
const { getArtistByName, getAlbum } = require('../store-getters')

const Album = require('../components/Album')
const Heading = require('../components/Heading')
const Link = require('../components/Link')
const Loader = require('../components/Loader')
const Sheet = require('../components/Sheet')
const TrackList = require('../components/TrackList')

class AlbumPage extends Component {
  componentDidMount () {
    this._fetch()
  }

  componentWillReceiveProps (nextProps) {
    if (!entity.equal(this.props.entity, nextProps.entity)) this._fetch()
  }

  _fetch () {
    const { entity } = store
    store.dispatch('FETCH_ALBUM_INFO', entity)
  }

  render (props) {
    const { entity } = store
    const album = getAlbum(entity.url)

    if (!album || !album.images) {
      return <Sheet><Loader center /></Sheet>
    }

    const artist = getArtistByName(album.artistName)
    let $tracks = <Loader center />

    if (album.tracks.length > 0) {
      $tracks = (
        <TrackList
          class='mt1'
          tracks={album.tracks}
          showArtistName={false}
        />
      )
    }

    const summary = album.summary && album.summary.replace(/\n/g, '<br>')
    let $summary = null

    if (summary) {
      $summary = (
        <div class='mt5 center lh-copy mw7'>
          <Heading class='tc'>Why This Album Matters</Heading>
          <div class='f4 white-80' dangerouslySetInnerHTML={{ __html: summary }} />
        </div>
      )
    }

    return (
      <Sheet>
        <div class='cf'>
          <div class='fl w-third pr4'>
            <div class='mw6 center tc'>
              <Album
                album={album}
                sizeHint='30vw'
                showName={false}
                showArtistName={false}
                showLink={false}
              />
              <Heading>{album.name}</Heading>
              <div class='white-50'>By <Link href={artist.url}>{artist.name}</Link></div>
              <div class='f6 mt4 white-50 tracked ttu'>{album.tracks.length} songs</div>
            </div>
          </div>
          <div class='fl w-two-thirds'>
            {$tracks}
          </div>
        </div>
        {$summary}
      </Sheet>
    )
  }
}

module.exports = AlbumPage
