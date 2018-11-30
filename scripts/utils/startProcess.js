const cluster = require('cluster')

function startProcess(filePath) {
  cluster.setupMaster({ exec: filePath })

  return cluster.fork()
}

module.exports = startProcess
