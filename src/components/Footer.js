const { h } = require('preact') /** @jsx h */

const Link = require('./Link')

const Footer = () => (
  <footer
    id='footer'
    class='fixed bottom-0 f6 ph3 mt3 ma-100 center'
  >
    <p>
      Made with ❤ by <Link href='https://feross.org'>Feross</Link>.
    </p>
  </footer>
)

module.exports = Footer
