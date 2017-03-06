const { createStore, applyMiddleware } = require('redux')
const thunkMiddleware = require('redux-thunk').default
const createLogger = require('redux-logger')

const rootReducer = require('./reducers')

const middlewares = [ thunkMiddleware ]

if (typeof createLogger === 'function') {
  // `redux-logger` is excluded in production to reduce bundle size
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
