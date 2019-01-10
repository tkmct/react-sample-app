#! /usr/bin/env node
'use strict'

// TODO: read from procces.env
process.env.NODE_ENV = 'production'
const PORT = process.env.PORT || 2233

const path = require('path')
const webpack = require('webpack')
const devServer = require('webpack-dev-server')
const clearConsole = require('react-dev-utils/clearConsole')
const openBrowser = require('react-dev-utils/openBrowser')
const chalk = require('chalk')
const startProcess = require('./utils/startProcess')
const createConfig = require('../configs/createConfig')

function main() {
  clearConsole()
  console.log(chalk.magenta('Starting...'))

  const clientConfig = createConfig('web', 'production', { port: PORT })
  const serverConfig = createConfig('node', 'production', { port: PORT })

  const clientCompiler = compile(clientConfig)
  const serverCompiler = compile(serverConfig)

  let serverProcess

  clientCompiler.hooks.done.tap('Watch server', () => {
    serverCompiler.watch({ quiet: true }, (err, stats) => {})
  })

  serverCompiler.hooks.done.tap('Restart server', () => {
    if (serverProcess) {
      serverProcess.kill()
      console.log(chalk.bgBlueBright(' I '), 'Restarting server')
    } else {
      console.log(chalk.bgBlueBright(' I '), 'Starting server')
    }

    serverProcess = startProcess(path.resolve('dist/server.js'))

    console.log(chalk.bgBlueBright(' I '), 'Server started on port: ' + PORT)

    openBrowser('http://localhost:' + PORT)
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
