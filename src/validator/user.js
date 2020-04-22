const { validate } = require('./validator');
const { saveProp } = require('../utils/tool');

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
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 60,
    },
    user_name: {
      type: 'string',
      minLength: 2,
      maxLength: 25,
    },
    captha: {
      type: 'string',
      minLength: 4,
      maxLength: 8,
    },
    invite_code: {
      type: 'string',
      minLength: 2,
      maxLength: 20,
    },
  },
};

const getScheme = (key) => {
  if (key === 'login') {
  } else if (key === 'register') {
    saveProp(SCHEMA, ['user_name', 'password', 'invite_code', 'nick']);
  }
};

exports.userValidate = (data, key) => {
  return validate(getScheme(key), data);
};
