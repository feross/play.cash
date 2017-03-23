const { createStore, applyMiddleware } = require('redux')
const thunkMiddleware = require('redux-thunk').default
const createLogger = require('redux-logger') // Excluded in production

const rootReducer = require('./reducers')

const middlewares = [ thunkMiddleware ]

if (typeof createLogger === 'function') {
  const loggerMiddleware = createLogger()
  middlewares.push(loggerMiddleware)
}

function configureStore (preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  )
}

module.exports = configureStore
