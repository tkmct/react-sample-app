#! /usr/bin/env node
'use strict'

// TODO: read from procces.env
process.env.NODE_ENV = 'development'
const PORT = process.env.PORT || 2233

const path = require('path')
const webpack = require('webpack')
const devServer = require('webpack-dev-server')
const clearConsole = require('react-dev-utils/clearConsole')
const chalk = require('chalk')
const opn = require('opn')
const startProcess = require('./utils/startProcess')

function main() {
  clearConsole()
  console.log(chalk.magenta('Starting...'))
  const clientConfig = require('../configs/client.dev')
  const serverConfig = require('../configs/server.dev')

  const clientCompiler = compile(clientConfig)
  const serverCompiler = compile(serverConfig)

  let serverProcess

  clientCompiler.hooks.done.tap('Watch server', () => {
    serverCompiler.watch({ quiet: true }, (err, stats) => {})
  })

  serverCompiler.hooks.done.tap('Restart server', () => {
    if (serverProcess) {
      serverProcess.kill()
      console.log('Restarting server')
    } else {
      console.log('Starting server')
    }

    serverProcess = startProcess(path.resolve('dist/server.js'))
  })

  // FIXME: more elegant implementation
  // Open browser when build start for first time
  let browserOpen = false
  serverCompiler.hooks.done.tap('Open', () => {
    if (!browserOpen) {
      opn('http://localhost:' + PORT)
      browserOpen = true
    }
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
