const { code } = require('../config/invite_code');
const { validate } = require('./validator');
const { addKey } = require('../validator/validator');

addKey('validateCaptcha', (data) => {
  const { ctx } = data;
  if (ctx.session && ctx.session['captcha']) {
    const captcha = ctx.session['captcha'].toLocaleLowerCase();
    if (data.captcha == captcha) {
      return false; //验证成功
    } else {
      return '验证码不正确';
    }
  } else {
    return '验证码已过期';
  }
});

addKey('validateIcode', (data) => {
  const { invite_code } = data;
  if (code == invite_code) {
    return false;
  } else {
    return '邀请码错误';
  }
});

const SCHEMA = {
  type: 'object',
  properties: {
    user_id: {
      type: ['string', 'integer'],
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
    old_password: {
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
      errorMessage: '用户名格式错误',
    },
    captcha: {
      type: ['string', 'integer'],
      minLength: 4,
      maxLength: 8,
      validateCaptcha: true,
    },
    invite_code: {
      type: ['string', 'integer'],
      minLength: 2,
      maxLength: 20,
      validateIcode: true,
    },
    code: {
      type: ['string', 'integer'],
      minLength: 2,
      maxLength: 20,
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
  } else if (key == 'update_user') {
    data['required'] = [];
    return data;
  } else if (key == 'update_code') {
    data['required'] = ['code'];
    return data;
  }
};

exports.userValidate = (data, key, ctx) => {
  return validate(getScheme(key), data, ctx);
};
