const { Router } = require('express');
const authRouter = require('./auth.router')

const { public, private, admin } = require('../../controllers/test.controller');
const authGuardMiddleware = require('../../middleware/authGuard.middleware');
const roleGrardMiddleware = require('../../middleware/roleGrard.middleware');

const v1Router = Router();

v1Router.use('/auth', authRouter)

v1Router.get('/public', public)
v1Router.get('/private', authGuardMiddleware, private)
v1Router.get('/admin', authGuardMiddleware, roleGrardMiddleware('admin'), admin)


module.exports = v1Router;