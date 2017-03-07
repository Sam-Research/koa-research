/*!
 *  co 异步控制工具与使用场景
 *  https://github.com/tj/co/wiki
 */
'use strict'

const co = require('co')
const gather = require('co-gather')
const bluebird = require('bluebird')
const thenify = require('thenify')
const series = require('co-series')

exports.promisify = bluebird.promisify
exports.co = co
exports.thenify = thenify
exports.series = series

/**
 *  gather 按顺序 return [
 *  {isError: false, value: result},
 *  {isError: true, error: err}
 *  ]
 */
exports.gather = gather
exports.gather2 = gather2
exports.thread = thread
/**
 *  same gather, just return result
 *  @date  2016-03-20
 *  @param {[type]}   thunks        [description]
 *  @param {[type]}   n             [description]
 *  @yield {[type]}   [description]
 */
function * gather2 (thunks, n) {
  n = Math.min(n || 5, thunks.length)
  var ret = { data: [], error: [] }
  var index = 0

  function * next () {
    var i = index++
    try {
      ret.data.push(yield thunks[i])
    } catch (err) {
      ret.error.push(err)
    }

    if (index < thunks.length) yield next
  }

  yield thread(next, n)

  return ret
}

/**
 * Run `fn` `n` times in parallel.
 *
 * @param {Function} fn
 * @param {Number} n
 * @return {Array}
 * @api public
 */
function thread (fn, n) {
  var gens = []
  while (n--) gens.push(fn)
  return gens
}
