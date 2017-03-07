'use strict'

// controller
const user = require('./controller/user')
// const sign = require('./controller/sign')

// middleware
const auth = require('./middleware/authenticator')
const restify = require('./middleware/restify')

const Router = require('koa-router')

const router = new Router({ prefix: '/api/v1' })

// global auth
router.use('/', auth.tokenRequired)

router.get('/users', restify.list, user.list)
router.post('/users', user.create)
router.put('/users/:param', user.update)
router.del('/users/:id', user.remove)

module.exports = router
