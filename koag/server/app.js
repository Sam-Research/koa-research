'use strict'

const co = require('co')
const Primise = require('bluebird')
const app = require('koa')()
const config = require('./config')

app.init = co.wrap(function * () {
  yield require('./config/db')
  // init event
  require('./service/event').init()
  require('./config/koa')(app)
  app.server = require('http').Server(app.callback())
  if (config.app.isProd) {
    console.info('[2s 后启动 app ]...')
    yield Primise.delay(2000)
  }
})

if (!module.parent) {
  app.init()
    .then(() => {
      app.server.listen(config.app.port)
      console.log('ENV: ', config.app.env)
      console.log('%s is listening port: %d !!!', config.app.name, config.app.port)
    })
    .catch((err) => {
      console.error('start error:', err.stack)
    // process.exit(0)
    })
}

module.exports = app
