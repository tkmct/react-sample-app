import * as Express from 'express'
import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '../client/App'
import htmlTemplate from './htmlTemplate'
import counter, { fetchCounter } from '../store/counter'

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
    const preloadedState = count
    const store = createStore(counter, preloadedState)

    const [headHtml, tailHtml] = htmlTemplate(
      ['public/client.js'],
      preloadedState
    )

    res.write(headHtml)
    const stream = renderToNodeStream(
      <Provider store={store}>
        <App />
      </Provider>
    )

    stream.pipe(
      res,
      { end: false }
    )
    stream.on('end', () => {
      res.end(tailHtml)
    })
  })
}

app.listen(PORT)
