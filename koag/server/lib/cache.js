'use strict'

const redis = require('../config/redis')

exports.redis = redis

const LOCK_NAME = 'app:lock:'
// const LOCK_TTL = 60 * 60 * 24 * 7

exports.lock = function (key) {
  try {
    key = LOCK_NAME + key
    return redis.setnx(key, 'locking')
  } catch (err) {
    console.error('redis Err:', err)
  }
}

exports.getLock = function (key) {
  key = LOCK_NAME + key
  return redis.get(key)
}

exports.unLock = function (key) {
  key = LOCK_NAME + key
  return redis.del(key)
}
