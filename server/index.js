require('./rollbar')

const ConnectSQLite = require('connect-sqlite3')
const http = require('http')
const path = require('path')
const session = require('express-session')

const app = require('./app')
const config = require('../config')

const PORT = process.argv[2] || 4000

const server = http.createServer()
server.listen(PORT, '127.0.0.1', onListening)

function onListening (err) {
  if (err) throw err
  console.log('Listening on port %s', server.address().port)

  // Open DB as 'www-data' user
  const SQLiteStore = ConnectSQLite(session)
  const sessionStore = new SQLiteStore({ dir: path.join(config.root, 'db') })

  app.init(server, sessionStore)
}
