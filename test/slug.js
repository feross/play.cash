const test = require('tape')
const slug = require('../src/slug')

test('slug.encode creates slugs', (t) => {
  t.equal(slug.encode('Five Iron Frenzy'), 'Five-Iron-Frenzy')
  t.equal(slug.encode('Kygo'), 'Kygo')
  t.equal(slug.encode('blink-182'), 'blink_182')
  t.equal(slug.encode('AC/DC'), 'AC%2FDC')
  t.equal(slug.encode('This is Cool - EP'), 'This-is-Cool-_-EP')

  t.end()
})

test('slug.encode + slug.decode is fully reversible', (t) => {
  check('Five Iron Frenzy')
  check('Kygo')
  check('blink-182')
  check('AC/DC')
  check('This is Cool - EP')
  check('_ - _- _ __ ___ ___-')

  t.end()

  function check (str) {
    t.equal(slug.decode(slug.encode(str)), str)
  }
})
