const cluster = require('cluster')

function startProcess(filePath) {
  cluster.setupMaster({
    exec: filePath,
    silent: true
  })

  return cluster.fork()
}

module.exports = startProcess
