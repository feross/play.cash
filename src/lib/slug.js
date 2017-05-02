module.exports = {
  encode,
  decode
}

/**
 * Convert a string to a slug. Reversible.
 *
 *   util.encode('Five Iron Frenzy') // 'five-iron-frenzy'
 *   util.encode('Kygo') // 'kygo'
 *   util.encode('blink-182') // 'blink_-182'
 */
function encode (str) {
  return encodeURIComponent(str)
    .replace(/_/g, '__')
    .replace(/-/g, '_-')
    .replace(/%2F/g, '_s') // forward slash
    .replace(/%20/g, '-') // space
}

/**
 * Convert a slug back to the original string Given a slugified string, convert back to a normal string.
 *
 *   util.decode('five-iron-frenzy') // 'five iron frenzy'
 *   util.decode('kygo') // 'kygo'
 *   util.decode('blink_-182') // 'blink-182'
 */
function decode (str) {
  return decodeURIComponent(
    str
      .replace(/__/g, '$UNDERSCORE')
      .replace(/_-/g, '$DASH')
      .replace(/_s/g, '$FORWARDSLASH')
      .replace(/-/g, ' ')
      .replace(/\$UNDERSCORE/g, '_')
      .replace(/\$DASH/g, '-')
      .replace(/\$FORWARDSLASH/g, '/')
  )
}
