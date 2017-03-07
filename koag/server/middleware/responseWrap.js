'use strict'

const logger = require('../lib/logger').logger
const RES = require('../lib/body-res')

module.exports = function * (next) {
  const ctx = this
  let body = RES.body
  try {
    yield next
    if (!ctx.body) return // 404 的情况
    if (ctx.status === 200 && ctx.body.code === undefined) {
      delete body.msg
      body.data = ctx.body
      ctx.body = body
    }
  } catch (e) {
    delete body.data
    body.code = RES.CODE.FAIL
    let err = e
    if (err === null) {
      err = new Error('Null or undefined error')
    }
    // Joi 错误
    if (err.isJoi) {
      logger.error(err)
      body.msg = err.details
      // ctx.status = 400
      ctx.body = body
      return
    }
    // this.throw
    if (err.status === 400) {
      logger.warn('%s', err)
      body.msg = err.toString() || 'RequestError'
      // ctx.status = 200
      ctx.body = body
      return
    }
    // MongooseError
    if (err.name === 'MongooseError') {
      logger.error('db error:', err)
      body.msg = err.toString() || 'db Error'
      ctx.status = 200
      ctx.body = body
      return
    }

    ctx.status = err.status || 500
    ctx.type = 'application/json'
    body.msg = err.message || '未知错误'
    ctx.body = body
    ctx.app.emit('error', err, this)
  }
}
