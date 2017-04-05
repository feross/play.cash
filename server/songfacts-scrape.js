// TODO: Replace this with proper SongFacts API. This is just a temporary hack to
//       unblock me while I wait for API access.

const jsdom = require('jsdom')

class SongFacts {
  getFacts (params, cb) {
    if (!params.artist) throw new Error('missing `artist` param')
    if (!params.track) throw new Error('missing `track` param')

    const baseUrl = 'http://www.songfacts.com'

    const searchUrl = baseUrl + '/search-songs-1.php?' + encodeURIComponent(params.track).replace(/%20/g, '+')

    get(searchUrl, (err, window) => {
      if (err) return cb(err)
      const topResult = window.$('.songullist-orange li a')
      if (!topResult.length) return cb(new Error('no results'))

      const trackUrl = baseUrl + topResult.attr('href')

      get(trackUrl, (err, window) => {
        if (err) return cb(err)
        const artistName = window.$('.sfdetail a').get(0).textContent
        if (artistName.toLowerCase() !== params.artist.toLowerCase()) {
          return cb(new Error('artist mismatch ' + artistName + ' ' + params.artist))
        }
        const facts = window.$('.factsullist-sf li .inner').map((i, elem) => {
          return window.$(elem).text().replace(/>>.*/, '').replace(/\n/g, ' ').replace(/ +/g, ' ')
        }).toArray()
        cb(null, facts)
      })
    })
  }
}

function get (url, cb) {
  jsdom.env(url, ['http://code.jquery.com/jquery.js'], {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
  }, cb)
}

module.exports = SongFacts
