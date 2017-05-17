module.exports = {
  init
}

const debug = require('debug')('play:socket')
const Socket = require('simple-websocket')

const config = require('../config')

function init (game, update) {
  debug('init')

  const conn = new Socket(config.wsOrigin)
  setup()

  function setup () {
    conn.once('error', onCloseOrError)
    conn.once('close', onCloseOrError)
    conn.on('data', onMessage)
  }

  function send (message) {
    debug('send: %o', message)
    conn.send(JSON.stringify(message))
  }

  function onCloseOrError (err) {
    if (err) console.error(err.stack)
    conn.removeListener('close', onCloseOrError)
    conn.removeListener('error', onCloseOrError)
    conn.removeListener('data', onMessage)

    // Wait 5-10 seconds, then reconnect
    const timeoutMs = 5000 + (Math.random() * 5000)
    setTimeout(() => init(game), timeoutMs)
  }

  function onMessage (message) {
    try {
      message = JSON.parse(message)
    } catch (err) {
      console.error('Ignoring invalid message: ' + message)
    }
    debug('receive: %o', message)

    if (message.type === 'ready') {
      onMessageReady()
    }

    update()
  }

  function onMessageReady () {
    send({ type: 'todo' })
  }
}
