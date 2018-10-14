import * as Express from 'express'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../client/App'
import renderHtml from './renderHtml'

const app = Express()

app.use(Express.static('dist'))

app.get('/', (_: Express.Request, res: Express.Response) => {
  const jsx = <App />
  const reactDom = renderToString(jsx)

  res.send(renderHtml(reactDom, ['client.js']))
})

app.listen(2233, () => {
  console.log('App is listening on port 2233')
})
