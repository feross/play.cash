const get = require('simple-get')

class SongFacts {
  constructor (key, userAgent) {
    if (!key) throw new Error('Missing required `key` argument')
    this._key = key
    this._userAgent = userAgent || 'SongFacts'
  }

  getFacts (opts, cb) {
    if (!opts.name) return cb(new Error('missing `name` param'))
    if (!opts.artistName) return cb(new Error('missing `artistName` param'))

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

    const name = opts.name.replace(/:/g, '')
    const artistName = opts.artistName.replace(/:/g, '')

    const url = [urlBase, switches.join(':'), artistName, name].join(':')

    const params = {
      url: url,
      headers: {
        'User-Agent': this._userAgent
      },
      timeout: 30 * 1000,
      json: true
    }

    get.concat(params, onResponse)

    function onResponse (err, res, data) {
      if (err) return cb(err)

      const apiData = data && data.apidata
      if (!apiData) {
        return cb(new Error('Unexpected response from SongFacts API ' + JSON.stringify(data)))
      }

      const {
        result,
        generalinfo: info,
        factsquery: facts
      } = apiData

      const code = result && result.code
      if (!code) {
        return cb(new Error('Unexpected response from SongFacts API ' + JSON.stringify(data)))
      }

      const meta = { query: opts }

      // No match found
      if (code === '0') {
        cb(null, {
          meta,
          info: {},
          facts: []
        })
      } else if (code === '1' || code === '2') {
        // SongFacts or ArtistFacts match found
        const result = {
          meta,
          info: {
            name: info.songtitle,
            artistName: info.artistname,
            albumName: info.albumname,
            released: Number(info.released) || undefined,
            usChart: Number(info.uschartpos) || undefined,
            ukChart: Number(info.ukchartpos) || undefined
          },
          facts: (facts && facts.facts && facts.facts.fact) || []
        }
        return cb(null, result)
      } else {
        // Other error codes are treated as errors
        const errMessage = result.text || ('Unknown SongFacts Error ' + JSON.stringify(data))
        cb(new Error(errMessage))
      }
    }
  }
}

module.exports = SongFacts
