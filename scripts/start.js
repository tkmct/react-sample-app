#! /usr/bin/env node
'use strict'

process.env.NODE_ENV = 'development'
const PORT = process.env.PORT || 2233

const webpack = require('webpack')
const devServer = require('webpack-dev-server')

function main() {
  const clientConfig = require('../configs/client.dev')
  const serverConfig = require('../configs/server.dev')

  const clientCompiler = compile(clientConfig)
  const serverCompiler = compile(serverConfig)

  clientCompiler.hooks.done.tap('StartServer', () => {
    console.info('[webpack] client compiled!')
    serverCompiler.watch({ quiet: true }, (err, stats) => {
      console.log('[webpack] server compiled!')
    })
  })

  const clientDevServer = new devServer(clientCompiler, clientConfig.devServer)
  clientDevServer.listen(PORT + 1, 'localhost', error => {
    if (error) {
      console.error(error)
    }
  })
}

function compile(config) {
  let compiler
  try {
    compiler = webpack(config)
  } catch (e) {
    console.error('Failed to compile.', e)
    process.exit(1)
  }

  return compiler
}

main()
