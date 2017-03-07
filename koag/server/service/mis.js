'use strict'

const rp = require('../lib/request')
const config = require('../config')
const headers = {'x-token': config.app.token}
const MIS2_HOST = config.mis2.host

exports.get = function (data) {
  const uri = MIS2_HOST + '/api/v1/test'
  return rp({
    uri: uri,
    headers: headers,
    data: data
  })
}
