'use strict'

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const config = require('../config')

function create (uri) {
  const db = mongoose.createConnection(uri)
  db.on('connected', function () {
    console.info('%s mongo connected: %s!!!', db.name, uri)
  })

  db.on('error', function (err) {
    console.error('%s mongo Error: %s', uri, err)
  })
  return db
}

exports.main = create(config.mongo.uri)
exports.second = create(config.mongo_second.uri)
