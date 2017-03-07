'use strict'

const config = require('../config')
const morgan = require('koa-morgan')
const bodyparser = require('koa-bodyparser')
const cors = require('koa-cors')
const router = require('../router')
const responseWrap = require('../middleware/responseWrap')
const logger = require('../lib/logger').logger
const format = config.app.isProd ? 'combined' : 'dev'
const options = {
  stream: {
    write (str) {
      logger.info(str)
    }
  }
}

module.exports = function (app) {
  app.keys = config.app.keys
  app.use(cors({origin: '*'}))
  app.use(morgan.middleware(format, options))
  app.use(bodyparser())
  app.use(responseWrap)
  app.use(router.routes())

  // 记录错误的日志，原 koa 会自动 catch 所有日志
  app.on('error', (err, ctx) => {
    logger.error('server error ->', err)
  })
}
