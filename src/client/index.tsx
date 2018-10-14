import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import counter from '../store/counter'

if (window) {
  const preloadedState = (window as any).__PRELOADED_STATE__
  delete (window as any).__PRELOADED_STATE__
  const store = createStore(counter, preloadedState)
  ;(window as any).store = store // FIXME: for debug purpose

  ReactDOM.hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
}

// HMR
if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default

    ReactDOM.hydrate(
      <Provider store={(window as any).store}>
        <App />
      </Provider>,
      document.getElementById('app')
    )
  })
}
