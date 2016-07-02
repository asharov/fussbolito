import { applyMiddleware, createStore } from 'redux'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage'
import rootReducer from './reducers/rootReducer'
import createLogger from 'redux-logger'

const logger = createLogger()
const reducer = storage.reducer(rootReducer)
const engine = createEngine('fussbolito')
const middleware = storage.createMiddleware(engine)
const createStoreWithMiddleware = applyMiddleware(middleware, logger)(createStore)
const store = createStoreWithMiddleware(reducer)

const load = storage.createLoader(engine)
load(store)

export default store
