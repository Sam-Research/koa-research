'use strict'

const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const path = require('path')
const moment = require('moment')

const config = require('../config')

const dateFormat = function () {
  return moment().format('YYYY-MM-DD HH:mm:ss:SSS')
}

const mkdir = function (str) {
  str = config.app.name + '-' + config.app.port + '-' + str
  return path.resolve(config.app.log.dir, str)
}

// console.log('log_dir %s; log: %s', config.app.log.dir, mkdir('all.log'))

const consoleTransport = new (winston.transports.Console)({
  timestamp: dateFormat,
  level: config.app.log.level,
  colorize: config.app.log.colorize,
  prettyPrint: true,
  stringify: true,
  silent: false,
  json: false
})

const allLoggerTransport = new DailyRotateFile({
  name: 'all',
  filename: mkdir('all.log'),
  timestamp: dateFormat,
  level: 'info',
  colorize: true,
  maxsize: config.app.log.size,
  datePattern: '.yyyy-MM-dd'
})

const errorTransport = new (winston.transports.File)({
  name: 'error',
  filename: mkdir('error.log'),
  timestamp: dateFormat,
  level: 'error',
  colorize: true
})

const Transport = [consoleTransport]

if (config.app.isProd) {
  Transport.push(allLoggerTransport)
  Transport.push(errorTransport)
}

// 日志
exports.logger = new (winston.Logger)({
  transports: Transport
})

// 崩溃日志，只在 worker.js 里引用
exports.crash = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'crash',
      filename: mkdir('crash.log'),
      level: 'error',
      timestamp: dateFormat,
      // handleExceptions: true,
      // humanReadableUnhandledException: true,
      json: false,
      colorize: true
    })
  ]
})
