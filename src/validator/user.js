const { code } = require("../config/invite_code");
const { validate } = require('./validator');

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
      default: "无名"
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
      validate(data){
        const { invite_code } = data;
        return code == invite_code;
      }
    },
  },
};

const getScheme = (key) => {
  if (key === 'login') {
  } else if (key === 'register') {
    const data = {...SCHEMA};
    data["required"]= ['user_name', 'password', 'invite_code', 'nick'];
    return data;
  }
};

exports.userValidate = (data, key) => {
  return validate(getScheme(key), data);
};
