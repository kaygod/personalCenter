const basicAuth = require('basic-auth');
const { Fail } = require('../models/Response');
const jwt = require('jsonwebtoken');
const { security } = require('../config');

class Auth {
  constructor() {}

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req);
      let errMsg = 'token不合法';

      //这个userToken的name属性是前端自定义的,userToken.name就是token值
      if (!userToken || !userToken.name) {
        ctx.body = new Fail(88, errMsg);
        return false;
      }
      const { secretKey } = security;
      try {
        var decode = jwt.verify(userToken.name, secretKey);
      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          errMsg = 'token已过期';
        }
        ctx.body = new Fail(89, errMsg);
        return false;
      }

      // uid,scope
      ctx.auth = decode;

      await next();
    };
  }
}

module.exports = Auth;
