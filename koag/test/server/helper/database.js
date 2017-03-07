'use strict'

exports.drop = function () {
  const {main} = require('../../../server/config/db')

  const mainModels = main.modelNames().map((m) => main.model(m))
  // const secondModels = second.modelNames().map((m) => second.model(m))
  console.warn('will clear db main collection : ', main.modelNames())
  // console.warn('will clear db second collection : ', second.modelNames())

  const allModels = [].concat(mainModels)

  return allModels.map(dropCollection)
}

function dropCollection (Model) {
  return new Promise(function (resolve, reject) {
    Model.collection.remove(function (err) {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}
