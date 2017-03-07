'use strict'

/**
 * Module dependencies.
 */

const path = require('path')
const util = require('util')
const cfork = require('cfork')
const config = require('./server/config')

let workerPath = path.join(__dirname, './worker.js')

cfork({
  exec: workerPath,
  count: config.app.worker.numCPUs,
  limit: config.app.worker.limit
// slaves: ['/your/app/slave.js'],
// count: require('os').cpus().length,
})
  .on('fork', function (worker) {
    console.warn('[%s] [worker:%d] new worker start', Date(), worker.process.pid)
  })
  .on('disconnect', function (worker) {
    console.warn('[%s] [master:%s] wroker:%s disconnect, suicide: %s, state: %s.',
      Date(), process.pid, worker.process.pid, worker.suicide, worker.state)
  })
  .on('exit', function (worker, code, signal) {
    var exitCode = worker.process.exitCode
    var err = new Error(util.format('worker %s died (code: %s, signal: %s, suicide: %s, state: %s)',
      worker.process.pid, exitCode, signal, worker.suicide, worker.state))
    err.name = 'WorkerDiedError'
    console.error('[%s] [master:%s] wroker exit: %s', Date(), process.pid, err.stack)
  })

  /*
    // if you do not listen to this event
    // cfork will output this message to stderr
    .on('unexpectedExit', function (worker, code, signal) {
      // logger what you want
    })

    // if you do not listen to this event
    // cfork will listen it and output the error message to stderr
    process.on('uncaughtException', function (err) {
      // do what you want
    })

    // emit when reach refork times limit
    .on('reachReforkLimit', function () {
      // do what you want
    })
  */
