const { Router } = require('express');
const authRouter = require('./auth.router')

const v1Router = Router();

v1Router.use('/auth', authRouter)

module.exports = v1Router;