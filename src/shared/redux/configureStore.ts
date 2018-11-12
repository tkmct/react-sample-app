import { createStore } from 'redux'
import rootReducer from './modules'

const configureStore = (preloadedState: any) => {
  return createStore(rootReducer, preloadedState)
}

export default configureStore
