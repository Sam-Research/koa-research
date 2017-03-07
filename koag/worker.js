/*!
 * Copyright(c) cnpmjs.org and other contributors.
 * MIT Licensed
 *
 * Authors:
 *  dead_horse <dead_horse@qq.com>
 *  fengmk2 <fengmk2@gmail.com> (http://fengmk2.com)
 */

'use strict'

/**
 * Module dependencies.
 */

const graceful = require('graceful')
const config = require('./server/config')

const web = require('./server/app')
const logger = require('./server/lib/logger').crash

let port = config.app.port
web.init().then(() => {
  web.server.listen(port)
  console.log('\n*****ENV:%s*******', config.app.env)
  console.log('[%s][worker:%d] Server started, %s server listen at %s:%d',
    new Date(), process.pid, config.app.name,
    'localhost', port)
  console.log('********************\n')
}).catch((err) => {
  console.error('worker error:', err.stack)
  process.exit(0)
})

graceful({
  server: [web],
  error: function (err, throwErrorCount) {
    if (err.message) {
      err.message += ' (uncaughtException throw ' + throwErrorCount + ' times on pid:' + process.pid + ')'
    }
    console.error(err)
    console.error(err.stack)
    logger.error(err)
  }
})
