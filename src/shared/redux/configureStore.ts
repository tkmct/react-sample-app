import { createStore, applyMiddleware } from 'redux'
import rootReducer from './modules'
import logger from './middlewares/logger'

const configureStore = (initialState?: any) => {
  return createStore(rootReducer, initialState, applyMiddleware(logger))
}

export default configureStore
