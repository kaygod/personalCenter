const { code } = require('../config/invite_code');
const { validate } = require('./validator');
const { sessionKey } = require('../utils/setSession');
const { Fail } = require('../models/Response');

const SCHEMA = {
  type: 'object',
  properties: {
    user_id: {
      type: 'string',
      pattern: '[0-9]+',
    },
    nick: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
      default: '无名',
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 60,
    },
    new_password: {
      type: 'string',
      minLength: 6,
      maxLength: 60,
    },
    user_name: {
      type: 'string',
      minLength: 2,
      maxLength: 25,
    },
    captcha: {
      type: 'string',
      minLength: 4,
      maxLength: 8,
      validate(data, key, ctx) {
        if (ctx.session && ctx.session['captcha']) {
          const captcha = ctx.session['captcha'].toLocaleLowerCase();
          if (data.captcha == captcha) {
            return true;
          } else {
            return new Fail(105, '验证码不正确');
          }
        } else {
          return new Fail(105, '验证码已过期');
        }
      },
    },
    invite_code: {
      type: 'string',
      minLength: 2,
      maxLength: 20,
      validate(data) {
        const { invite_code } = data;
        return code == invite_code;
      },
    },
  },
};

const getScheme = (key) => {
  const data = { ...SCHEMA };
  if (key === 'login') {
    data['required'] = ['user_name', 'password', 'captcha'];
    return data;
  } else if (key === 'register') {
    data['required'] = ['user_name', 'password', 'invite_code', 'nick'];
    return data;
  } else if (key == 'update_pwd') {
    data['required'] = ['user_id', 'password', 'new_password'];
    return data;
  }
};

exports.userValidate = (data, key, ctx) => {
  return validate(getScheme(key), data, ctx);
};
