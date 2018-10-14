import * as Express from 'express'
import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import App from '../client/App'
import htmlTemplate from './htmlTemplate'

const app = Express()

app.use(Express.static('dist'))

app.use('*', (_: Express.Request, res: Express.Response) => {
  const [headHtml, tailHtml] = htmlTemplate(['client.js'])
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
