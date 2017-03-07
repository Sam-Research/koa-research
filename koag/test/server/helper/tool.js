'use strict'

exports.genId = genId

function genId () {
  const mongoose = require('mongoose')
  const id = new (mongoose).Types.ObjectId()
  return id + ''
}
