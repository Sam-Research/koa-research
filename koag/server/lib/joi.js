'use strict'

const Joi = require('joi')

exports.validate = function (data, schema, options) {
  options = options || {allowUnknown: true, stripUnknown: true}
  return new Promise((resolve, reject) => {
    const _schema = Joi.object().keys(schema)
    Joi.validate(data, _schema, options, (err, value) => {
      if (err) return reject(err)
      resolve(value)
    })
  })
}

exports.Joi = Joi
