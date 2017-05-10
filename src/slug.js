module.exports = {
  encode,
  decode
}

/**
 * Convert a string to a slug. Reversible.
 *
 *   encode('Five Iron Frenzy') // 'Five-Iron-Frenzy'
 *   encode('Kygo') // 'Kygo'
 *   encode('blink-182') // 'blink_182'
 *   encode('AC/DC') // 'AC%2FDC'
 */

function encode (str) {
  return encodeURIComponent(str)
    .replace(/_/g, '%5F')
    .replace(/-/g, '_')
    .replace(/%20/g, '-') // space
}

/**
 * Convert a slug back to the original string Given a slugified string, convert back to a normal string.
 *
 *   decode('Five-Iron-Frenzy') // 'Five Iron Frenzy'
 *   decode('Kygo') // 'kygo'
 *   decode('blink_182') // 'blink-182'
 *   encode('AC%2FDC') // 'AC/DC'
 */

function decode (str) {
  return decodeURIComponent(
    str
      .replace(/-/g, ' ')
      .replace(/_/g, '-')
  )
}
