import { createStore, applyMiddleware } from 'redux'
import rootReducer from './modules'
import logger from './middlewares/logger'

const configureStore = (preloadedState: any) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(logger))
}

export default configureStore
