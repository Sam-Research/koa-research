'use strict'

const config = require('../config')
// const Model = require('../model')

/**
 * 简单封装 Mongo 查询操作, 判断 query, 拼接 query params
 */
exports.list = function * (next) {
  let qs = this.query
  // console.log('qs:', qs)
  // if (!qs) {
  //   yield next
  //   return
  // }
  const Options = [
    'limit',
    'offset',
    'skip',
    'sort'
  ]
  // const op = ['$gt', '$in', '$lt', '$ne', '$nin']
  let query = {}
  let options = {}
  for (let q in qs) {
    if (!q) continue
    if (Options.some((x) => x === q)) {
      q === 'offset'
        ? options.skip = qs[q]
        : options[q] = qs[q]
    } else {
      let ctx = qs[q]
      if (/\$/.test(ctx)) ctx = JSON.parse(ctx)
      query[q] = ctx
    }
  }
  this.query = {}
  let limit = options.limit || config.app.limit
  options.limit = parseInt(limit, 10)
  options.sort = options.sort ? options.sort : '-_id' // 默认按最新的排序
  options.skip = options.skip ? parseInt(options.skip, 10) * options.limit : 0
  this.query.options = options
  this.query.query = query
  // console.log('new query:', this.query)
  yield next
}
