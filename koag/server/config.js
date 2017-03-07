'use strict'

const path = require('path')
const _ = require('lodash')

const NODE_ENV = process.env.NODE_ENV || 'development'
const root = path.resolve(__dirname, '..')

const baseConfig = {
  app: {
    name: 'koag',
    root: root,
    env: NODE_ENV,
    isDev: NODE_ENV === 'development',
    isProd: NODE_ENV === 'production',
    keys: ['koag', 'secret@@koag!!!!'],
    secret: process.env.SECRET || 'koag&&&&&&secret!',
    debugMode: process.env.DEBUG_MODE === 'on',
    limit: 50, // filter limit default
    worker: {
      numCPUs: 1,
      limit: 20
    },
    redis: {
      port: process.env.REDIS_PORT || 6379,
      host: process.env.REDIS_HOST || 'localhost',
      family: 4
    },
    log: {
      dir: process.env.LOG_DIR || path.resolve(root, 'log'),
      level: process.env.LOG_LEVEL || 'debug',
      colorize: process.env.LOG_COLORIZE ? process.env.LOG_COLORIZE === 'on' : true,
      size: process.env.LOG_SIZE || 1024 * 1024 * 128
    },
    token: 'KOAG-X-TOKEN'
  },
  koag2: {
    host: 'http://localhost:8010'
  }
}

const platformConfig = {
  development: {
    app: {
      port: 8001,
      token: '123456'
    },
    mongo: {
      uri: process.env.MONGO_URI_DEV || 'mongodb://localhost:27017/koag-dev'
    },
    mongo_second: {
      uri: process.env.MONGO_SECOND_DEV || 'mongodb://localhost:27017/koag2-dev'
    }
  },
  test: {
    app: {
      port: 8002,
      token: '123456'
    },
    mongo: {
      uri: process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/koag-test'
    },
    mongo_second: {
      uri: process.env.MONGO_SECOND_TEST || 'mongodb://localhost:27017/koag2-test'
    }
  },
  production: {
    app: {
      port: process.env.PORT || 8001,
      token: process.env.TOKEN || 'df3cfe17f5467b31b7b307c4802637b9'
    },
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://localhost:27017/koag'
    },
    mongo_second: {
      uri: process.env.MONGO_SECOND || 'mongodb://localhost:27017/koag2'
    }
  }
}

module.exports = _.merge(baseConfig, platformConfig[NODE_ENV])
