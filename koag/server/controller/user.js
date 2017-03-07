'use strict'

const User = require('../model/user')
const logger = require('../lib/logger').logger
const isValidObjectId = require('mongoose').Types.ObjectId.isValid

exports.list = function * () {
  let qs = this.query || {}
  logger.debug('qs:', qs)
  // let options = this.query.options
  let result = yield User.findByAny(qs.query, qs.options)
  this.body = result
}

exports.create = function * () {
  let _user = this.request.body
  logger.debug('create:user', _user)
  let result = yield User.create(_user)
  this.status = 201
  this.body = result
}

exports.update = function * () {
  let param = this.params.param
  let doc = this.request.body
  let query = {}
  if (isValidObjectId(param)) {
    query = {
      _id: param
    }
  } else {
    query = {
      email: param
    }
  }

  // 禁止 email 修改
  if (doc.email) delete doc.email

  let result = yield User.updateByParamAndReturnNewDoc(query, doc)

  logger.debug('update -> result:', result)
  this.status = 201
  this.body = result
}

exports.remove = function * () {
  let id = this.params.id
  try {
    yield User.findByIdAndRemove(id).exec()
  } catch (e) {
    this.throw(400, e)
  }
  this.status = 204
}
