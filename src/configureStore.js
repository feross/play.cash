const { createStore, applyMiddleware } = require('redux')
const thunkMiddleware = require('redux-thunk').default
const createLogger = require('redux-logger')

const rootReducer = require('./reducers')

const loggerMiddleware = createLogger()

function configureStore (preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
}

module.exports = configureStore
