'use strict'

const EventEmitter = require('events').EventEmitter

const event = new EventEmitter()

const EVENT_NAME = {
  ITEM: 'item:test'
}
exports.event = event
exports.emit = event.emit
exports.on = event.on
exports.NAME = EVENT_NAME
