'use strict'

const Redis = require('ioredis')
const config = require('../config')

const redis = new Redis(config.app.redis)

redis.on('error', (err) => {
  console.log('redis eror:', err)
})

redis.once('connect', () => {
  console.log('redis connected:', config.app.redis)
})

redis.once('reconnecting', () => {
  console.log('redis Reconnecting')
})

module.exports = redis
