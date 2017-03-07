const config = require('../mocha.config')
const appConf = config.appConf
const nock = require('nock')

module.exports = function () {
  // 1. nock offerr
  const offerScope = nock(appConf.trade.url)
  .persist()
  .post('/api/')
  .reply(200, {code: 0, data: 'done'})
  if (!offerScope.isDone()) {
    console.error('pending mocks: %j', offerScope.pendingMocks())
  }
}
