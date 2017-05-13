module.exports = {
  init
}

const CookieParser = require('cookie-parser')
const debug = require('debug')('play:socket')
const SocketServer = require('simple-websocket/server')

const secret = require('../secret')

const cookieParser = CookieParser(secret.cookie)

function init (server, sessionStore) {
  const wsServer = new SocketServer({
    server
  })
  wsServer.on('connection', onConnection)

  function onConnection (socket) {
    setup()

    function setup () {
      socket.once('error', onCloseOrError)
      socket.once('close', onCloseOrError)
      socket.on('data', onMessage)

      cookieParser(socket.upgradeReq, null, (err) => {
        if (err) return destroy(new Error('Cannot parse cookie'))

        const sessionId = socket.upgradeReq.signedCookies['connect.sid']
        sessionStore.get(sessionId, (err, sess) => {
          if (err) {
            return destroy(new Error('Cannot get session'))
          }
          if (!sess.user || !sess.user.userName) {
            return destroy(new Error('Session lacks user'))
          }

          socket.user = sess.user
          send({ type: 'ready' })
        })
      })
    }

    function send (message) {
      debug('send: %o', message)
      socket.send(JSON.stringify(message), (err) => {
        if (err) debug('error sending: %s', err.message)
      })
    }

    function destroy (err) {
      if (err) {
        send({ type: 'error', message: err.message }, () => {
          socket.destroy()
        })
      }
    }

    function onCloseOrError (err) {
      if (err) console.error(err.stack)
      socket.removeListener('error', onCloseOrError)
      socket.removeListener('close', onCloseOrError)
      socket.removeListener('message', onMessage)
    }

    function onMessage (message) {
      try {
        message = JSON.parse(message)
      } catch (err) {
        console.error('Ignoring invalid message: ' + message)
      }
      debug('receive: %o', message)

      // if (message.type) {}
    }
  }
}
