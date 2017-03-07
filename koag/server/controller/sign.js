'use strict'

const User = require('../model/user')
const logger = require('../lib/logger').logger

// exports.showLogin = function * () {
//   this.body = 'this is a login page.'
// }

/**
 *  登陆成功并返回user资料，否则报错。
 *  @date  2016-04-05
 *  @yield {[type]}   [description]
 */
exports.login = function * () {
  const email = this.request.body.email
  const password = this.request.body.password
  let user

  try {
    user = yield User.findByLogin(email, password)
  } catch (err) {
    this.throw(400, err)
  }

  logger.debug('login', user)
  // this.session.user = user // 保存在 session
  this.status = 200
  this.body = user
}

// exports.logout = function * () {
//   this.session = null
//   this.status = 200
// }
