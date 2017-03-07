'use strict'

const mongoose = require('mongoose')
// const co = require('../lib/co').co
const tool = require('../lib/tool')
const crudByAny = require('../lib/mongoosePlugin').crudByAny
const Schema = mongoose.Schema

const schema = new Schema({
  email: {
    type: String,
    unique: true
  },
  name: String,
  nick: String,
  password: String,
  remark: String,
  // 黑名单
  block: {
    type: Boolean,
    default: false
  },
  role: {
    type: Number,
    default: 1
  }
})

// options
schema.set('timestamps', true) // createAt, updatedAt -> UTC
schema.set('minimize', false)
// schema.set('collection', 'user')

// hooks
// schema.plugin(timestamp)
schema.plugin(crudByAny)

schema.pre('save', function (next) {
  // update 不再起作用了， @@
  if (!this.isModified('password')) {
    console.log('pre not password')
    next()
  }

  const promise = tool.bhash(this.password, 10)
  promise
    .then((pwdHash) => {
      this.password = pwdHash
      next()
    })
    .catch(next)
// co.wrap(function * () {
//   let pwdHash = yield tool.bhash(this.password, 10)
//   this.password = pwdHash
// }).call(this).then(next).catch(next)
})

schema.methods.comparePassword = function (pwd) {
  return tool.bcompare(pwd, this.password)
}

schema.statics.findByLogin = function * (email, pwd) {
  let user = yield this.findOne({
    email: email
  }).exec()
  if (!user) {
    throw new Error('user no found')
  }
  if (!(yield user.comparePassword(pwd))) {
    throw new Error('password does not match')
  }
  user = user.toJSON()
  delete user.password
  return user
}

schema.statics.updateByIdAndReturnNewDoc = function * (id, doc) {
  // 更新密码的话，有问题！！
  if (doc.password) {
    doc.password = yield tool.bhash(doc.password, 10)
    console.warn('modify pwd')
  }
  let options = { new: true, select: '-password' } //  true to return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({_id: id}, doc, options).lean().exec()
}

schema.statics.updateByParamAndReturnNewDoc = function * (query, doc) {
  let oldPassword = doc.old_password

  if (query.email && !query._id) {
    if (!oldPassword) {
      throw new Error('Old password does not exist')
    }
    let user = yield this.findOne(query).exec()
    if (!user) {
      throw new Error('user no found')
    }
    if (!(yield user.comparePassword(oldPassword))) {
      throw new Error('password does not match')
    }
  }

  if (doc.new_password) {
    doc.password = yield tool.bhash(doc.new_password, 10)
    console.warn('modify pwd')
  }
  let options = { new: true, select: '-password' } //  true to return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate(query, doc, options).lean().exec()
}

const db = require('../config/db')
module.exports = db.main.model('User', schema)
