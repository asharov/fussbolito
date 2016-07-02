import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducers/rootReducer'
import createLogger from 'redux-logger'

const logger = createLogger()

export default createStore(rootReducer, applyMiddleware(logger))
