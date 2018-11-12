import { combineReducers } from 'redux'
import counter from './counter'
import githubSearch from './githubSearch'

export default combineReducers({
  counter,
  githubSearch
})

export const constructPreloadedState = (preloadedState: any) => {
  return preloadedState
}
