/* eslint-env mocha */
'use strict'

const utils = require('../../../server/lib/utils')
// const config = require('../mocha.config')
// const logger = require('../../../server/lib/logger').logger

describe('utils', () => {
  describe('getStartOfDate, 取某天凌晨时间', () => {
    it('应该返回当天凌晨时间', function * () {
      const time = utils.getStartOfDate('2016/10/28')
      time.should.be.equal(new Date('2016/10/28').getTime())
    })
  })
})
