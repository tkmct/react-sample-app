import server from './server'

server.listen(process.env.PORT || 2233)

// TODO: write hot module reloading code here
if (module.hot) {
  module.hot.accept('./server', () => {
    console.log('server hot!!')
  })
}
