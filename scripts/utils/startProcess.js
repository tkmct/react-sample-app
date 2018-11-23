const cluster = require('cluster')

function startProcess(filePath) {
  cluster.setupMaster({
    exec: filePath,
    silent: true
  })

  console.log('Server started')
  return cluster.fork()
}

module.exports = startProcess
