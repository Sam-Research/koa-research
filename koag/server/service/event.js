'use strict'

const event = require('../lib/event')
const co = require('../lib/co').co
const logger = require('../lib/logger').logger
const Service = require('./index')

exports.init = function () {
  logger.info('event init!')
  event.on(event.NAME.ITEM, exec(Service.mis.get))
}

function exec (fn, context) {
  return function (msg) {
    // logger.debug('event: ->', msg)
    co(fn.call(context, msg)).then(_done).catch(_err)
  }
}

function _done (result) {
  // logger.info('event:result ->', result)
}
function _err (err) {
  logger.error('event:err ->', err)
}
