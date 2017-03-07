/* eslint-env mocha */
'use strict'

process.env.NODE_ENV = 'test'

const supertest = require('co-supertest')
const path = require('path')
const app = require('../../server/app')
const config = require('../../server/config')

const port = config.app.port
const baseUrl = 'http://localhost:' + port + '/api/v1'

exports.appConf = config
exports.baseUrl = baseUrl
exports.supertest = supertest
exports.request = supertest(baseUrl)
// agent: admin areadly login
exports.agent = supertest.agent(baseUrl)
exports.root = path.resolve(__dirname)
// console.log('root:', exports.root)

before(function * () {
  this.timeout(10000)
  yield app.init()
  app.server = app.listen(port)
  console.info('test is listening port: ' + port)
  const databaseHelper = require('./helper/database')
  yield databaseHelper.drop()
  // 初始化数据
  yield databaseHelper.initData()

  require('./helper/nock')()
})

after(function (done) {
  app.server.close(done)
  console.info('test closed server and exit!')
})
