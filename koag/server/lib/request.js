'use strict'

const rp = require('request-promise')
// const debug = require('debug')('Lib:request')

const _expo = rp.defaults({
  json: true,
  timeout: 10000,
  transform: (body) => {
    if (body.data && (body.code === 0)) {
      return body.data
    }
    throw new Error(body.msg)
  }
})

module.exports = _expo
