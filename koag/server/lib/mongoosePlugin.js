'use strict'

const co = require('./co')

// const gather = co.gather
const gather2 = co.gather2

exports.crudByAny = function (schema) {
  schema.statics.removeByAnyId = function (id) {
    // TODO: 正则小心
    let cond = (typeof id === 'string')
      ? { _id: id }
      : { _id: { $in: id } }
    return this.remove(cond).exec()
  }

  schema.statics.findByAny = function (query, options, select) {
    query = query || {}
    options = options || {}
    select = select || {}
    return this.find(query, select, options).lean().exec()
  }
  schema.statics.findByBuilder = function (builder) {
    let seft = this
    let Query = this.find(builder.query, builder.select, builder.options)
    if (builder.populate) {
      if (Array.isArray(builder.populate)) {
        builder.populate.map((p) => {
          Query = Query.populate(builder.populate)
        })
      } else {
        Query = Query.populate(builder.populate)
      }
    }
    return {
      result: Query.lean().exec(),
      limit: builder.options.limit,
      skip: builder.options.skip,
      count: seft.count(builder.query).lean().exec()
    }
  }

  /**
   *  批量保存并容错
   *  @date  2016-03-20
   *  @param {array}   docs          [description]
   *  @yield {[type]}   [description]
   */
  schema.statics.batchSave = function (docs) {
    const M = this
    let promises = docs.map((x) => new M(x).save())
    return gather2(promises)
  // let result = yield gather(promises)
  // let body = { data: [], error: [] }
  // result.map((x) => {
  //   x.isError
  //   ? body.error.push(x.error.toJSON())
  //   : body.data.push(x.value.toJSON())
  // })
  // return body
  }

  /**
   *  批量一个一个更新，并返回更新结果（成功与失败）
   *  @date  2016-03-20
   *  @param {[type]}   mix       mix.query,mix.update
   *  @yield {[type]}   [description]
   */
  schema.statics.batchUpdate = function * (mix) {
    const m = this
    // const options = {new: true}
    let promises = mix.map((x) => m.findOneAndUpdate(x.query, x.update, x.options).lean().exec())
    return yield gather2(promises)
  }
}
