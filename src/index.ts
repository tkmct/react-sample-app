import * as http from 'http'
import app from './server'

const server = http.createServer(app)

server.listen(process.env.PORT || 2233, (error: Error) => {
  if (error) {
    console.log(error)
  }

  console.log('🚀 started')
})
