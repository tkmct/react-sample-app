#! /usr/bin/env node
'use strict'

process.env.NODE_ENV = 'development'
const PORT = process.env.PORT || 2233

const webpack = require('webpack')

function main() {
  const clientConfig = require('../configs/client.dev')
  const serverConfig = require('../configs/server.dev')

  const clientCompiler = compile(clientConfig)
  const serverCompiler = compile(serverConfig)

  clientCompiler.hooks.done.tap('StartServer', () => {
    console.info('client compile done!!')
    serverCompiler.watch(
      {
        quiet: true
      },
      (err, stats) => {
        console.log('server compiled: ', stats.hash)
      }
    )
  })

  clientCompiler.run((err, stats) => {
    console.log('compiled: ', stats.hash)
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
