const get = require('simple-get')

class SongFacts {
  constructor (key, userAgent) {
    if (!key) throw new Error('Missing required `key` argument')
    this._key = key
    this._userAgent = userAgent || 'SongFacts'
  }

  getFacts (params, cb) {
    if (!params.artist) throw new Error('missing `artist` param')
    if (!params.track) throw new Error('missing `track` param')

    const urlBase = 'https://apiv3.songfacts.com/?go=' + this._key

    const switches = [
      // Type of facts to fetch
      // 0 = SongFacts, 1 = SongFacts w/ ArtistFacts fallback, 2 = ArtistFacts
      1,
      // Include general info? (boolean)
      1,
      // Number of entries to display (0 = all entries)
      0,
      // Number of entries to skip
      0,
      // Remove contributing user credits? (boolean)
      1,
      // Include artist art url?
      0,
      // Reserved
      0,
      // Reserved
      0,
      // Include action debug log? (boolean)
      0,
      // Response type. 0 = XML, 1 = JSON
      1
    ]

    const artist = params.artist.replace(/:/g, '')
    const track = params.track.replace(/:/g, '')

    const url = [urlBase, switches.join(':'), artist, track].join(':')
    console.log(url)

    const opts = {
      url: url,
      headers: {
        'User-Agent': this._userAgent
      },
      timeout: 30 * 1000,
      json: true
    }

    get.concat(opts, onResponse)

    function onResponse (err, res, data) {
      if (err) return cb(err)
      cb(null, data)
    }
  }
}

module.exports = SongFacts
