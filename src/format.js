module.exports = {
  formatTime,
  formatInt
}

/**
 * Format a time (in secs).
 */
function formatTime (time) {
  const hours = Math.floor(time / 3600)
  let mins = Math.floor((time - hours * 3600) / 60)
  let secs = Math.floor(time - (hours * 3600) - (mins * 60))

  if (secs < 10) secs = '0' + secs

  if (hours > 0) {
    if (mins < 10) mins = '0' + mins
    return hours + ':' + mins + ':' + secs
  } else {
    return mins + ':' + secs
  }
}

const FORMAT_INT_REGEX = /(\d+)(\d{3})/

/**
 * Format an integer with commas.
 */
function formatInt (num) {
  num += '' // convert to String

  while (FORMAT_INT_REGEX.test(num)) {
    num = num.replace(FORMAT_INT_REGEX, '$1' + ',' + '$2')
  }
  return num
}
