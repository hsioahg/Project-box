const jwt = require('express-jwt')
const undojwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('./constant')
const { jwtErrorModel } = require('../../src/model/resModel')

const jwtAuth = jwt({
  secret: PRIVATE_KEY,
  credentialsRequired: true
}).unless({
  path: [
    '/api/user/login',
    '/api/user/getemail',
    '/api/user/nick',
    '/api/user/mailcheck',
    '/api/user/register',
    '/api/user/retpass'
  ]
})

//判断token是否过期
const jwtError = (err, req, res, next) => {
  console.log(err);
  if (err.name && err.name === 'UnauthorizedError') {
    const { status } = err
    res.json(
      new jwtErrorModel({
        status: status,
        msg:'token验证失效'
      })
    )
  }
}

//解析token
const jwtcode = (req) => {
  let token = req.get('Authorization')
  if (token.indexOf('Bearer') === 0) {
    token = token.replace('Bearer ', '')
  }
  return undojwt.verify(token, PRIVATE_KEY)
}

module.exports = {
  jwtAuth,
  jwtError,
  jwtcode
}