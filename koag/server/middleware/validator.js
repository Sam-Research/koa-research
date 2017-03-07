'use strict'

// const v = require('validator')
// const logger = require('../lib/logger').logger
const joi = require('../lib/joi')
const validate = joi.validate
const Joi = joi.Joi

exports.signup = function * (next) {
  const schema = {
    _id: Joi.string().length(24),
    userId: Joi.string().length(24),
    age: Joi.number()
  }
  yield validate(this.request.body, schema, {allowUnknown: true})
  yield next
}
