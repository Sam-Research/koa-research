'use strict'

const Moment = require('moment-timezone')
const _ = require('lodash')
const tk = require('timekeeper')

exports.moment = moment
/**
 * 中国时区
 * @method moment
 * @param  {[type]} d [description]
 * @return {[type]}   [description]
 */
function moment (d) {
  d = d || undefined
  return new Moment(d).tz('Asia/Shanghai')
}

/**
 * 返回时间戳
 */
exports.getStartOfDate = function (d, n) {
  return moment(d).add(n, 'days').startOf('day').valueOf()
}

exports.addDays = function (d, n) {
  return moment(d).add(n, 'days').toDate()
}
/**
 * 计算今天（默认）到指定日期的剩余天数
 * @method remainDays
 * @param  {[type]}   end   [description]
 * @param  {[type]}   start [description]
 * @return {[type]}         [description]
 */
exports.remainDays = function (end, start) {
  // start = start || new Date()
  const t1 = moment(moment(end).format('YYYY-MM-DD'))
  const t0 = moment(moment(start).format('YYYY-MM-DD'))
  // console.log('t,', t1, t0)
  return t1.diff(t0, 'days')
}

/**
 * 时间
 * @method tsOf
 * @param  {[type]} d [description]
 * @return {[type]}   [description]
 */
exports.tsOf = function (d) {
  return moment(d).valueOf()
}

// 设置时间点，场景测试非常有用
exports.setSystemTime = function (time) {
  return tk.travel(time)
}

exports.resetSystemTime = function () {
  return tk.reset()
}

exports.isFloatEqual = function (number1, number2, digits) {
  digits = digits || 6
  return _.floor(Math.abs(number1 - number2), digits) === 0
}
