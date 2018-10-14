import * as Express from 'express'
import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import App from '../client/App'
import htmlTemplate from './htmlTemplate'

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
  app.use(Express.static('dist'))
}

app.get('/', (_: Express.Request, res: Express.Response) => {
  const [headHtml, tailHtml] = htmlTemplate(['public/client.js'])
  res.write(headHtml)

  const stream = renderToNodeStream(<App />)
  stream.pipe(
    res,
    { end: false }
  )
  stream.on('end', () => {
    res.end(tailHtml)
  })
})

app.listen(2233, () => {
  console.log('App is listening on port 2233')
})
