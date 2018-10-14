import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

if (window) {
  const app = document.getElementById('app')
  ReactDOM.hydrate(<App />, app)
}

// HMR
if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default

    ReactDOM.hydrate(<App />, document.getElementById('app'))
  })
}
