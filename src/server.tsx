import * as Express from 'express'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

const app = Express()

app.use(Express.static('dist'))

app.get('/', (_: Express.Request, res: Express.Response) => {
  const jsx = <App />
  const reactDom = renderToString(jsx)

  res.send(htmlTemplate(reactDom))
})

app.listen(2233, () => {
  console.log('App is listening on port 2233')
})

function htmlTemplate(reactDom: React.ReactNode) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>React SSR</title>
      </head>
      
      <body>
          <div id="app">${reactDom}</div>
          <script src="./client.js"></script>
      </body>
      </html>
  `
}

export default app
