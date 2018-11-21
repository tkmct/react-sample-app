import * as http from 'http'
import app from './server'

const server = http.createServer(app)
let currentApp = app

server.listen(process.env.PORT || 2233, (error: Error) => {
  if (error) {
    console.log(error)
  }

  console.log('🚀 started')
})

if (module.hot) {
  // when detecting './server' file update, recreate app
  module.hot.accept('./server', () => {
    server.removeListener('request', currentApp)
    const newApp = require('./server').default
    server.on('request', newApp)
    currentApp = newApp
  })
}
