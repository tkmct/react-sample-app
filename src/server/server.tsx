import * as Express from 'express'
import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import App from '../shared/App'
import Html from '../shared/components/Html'
import counter, { fetchCounter } from '../shared/store/counter'

const PORT = 2233
const app = Express()

// HMR
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const clientConfig = require('../../configs/client.dev.js')

  const compiler = webpack(clientConfig)
  const options = {
    publicPath: clientConfig.output.publicPath,
    noInfo: true,
    serverSideRender: true
  }
  const devMiddleware = webpackDevMiddleware(compiler, options)

  app.use(devMiddleware)
  app.use(webpackHotMiddleware(compiler))
} else {
  app.use('/public', Express.static('dist'))
}

app.use(handleRender)

function handleRender(req: Express.Request, res: Express.Response) {
  fetchCounter().then(result => {
    const count = parseInt(req.query.count, 10) || result || 0
    const preloadedState = { count }
    const store = createStore(counter, preloadedState)

    res.write('<!doctype html>')

    renderToNodeStream(
      <Html src="/public/client.js" preloadedState={preloadedState}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={{}}>
            <App />
          </StaticRouter>
        </Provider>
      </Html>
    ).pipe(res)
  })
}

app.listen(PORT)
