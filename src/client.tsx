import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './shared/redux/configureStore'
import App from './shared/App'

if (window) {
  const preloadedState = JSON.parse(
    (document as any)
      .querySelector('#preloaded-state')
      .getAttribute('data-json')
  )
  const store = configureStore(preloadedState)
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
