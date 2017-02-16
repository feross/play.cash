const { Component, h } = require('preact') /** @jsx h */

const Link = require('./Link')

class Footer extends Component {
  render () {
    return (
      <footer id='footer' class='f6 mw8 ph3 mt3 ma-100 center'>
        <p>
          Made with ❤ by <Link href='http://feross.org'>Feross</Link>.
        </p>
      </footer>
    )
  }
}

module.exports = Footer
