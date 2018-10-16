import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import counter from '../shared/store/counter'
import App from '../shared/App'

if (window) {
  const preloadedState = (window as any).__PRELOADED_STATE__
  delete (window as any).__PRELOADED_STATE__
  const store = createStore(counter, preloadedState)
  ;(window as any).store = store // for HMR on client side

  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  )
}

// HMR
if (module.hot) {
  module.hot.accept('../shared/App', () => {
    const App = require('../shared/App').default

    ReactDOM.hydrate(
      <Provider store={(window as any).store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('app')
    )
  })
}
