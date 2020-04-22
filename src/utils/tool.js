const crypto = require('crypto');
const { salt } = require('../config');
const moment = require('moment');

/**
 * md5加密
 * @param {数据} data
 */
exports.md5 = (data) => {
  const md5Handler = crypto.createHmac('md5', salt).update(data);

  return md5Handler.digest('hex');
};

exports.saveProp = (params, array = []) => {
  const data = { ...params };
  const new_obj = {};
  for (let key in data) {
    if (array.includes(key)) {
      new_obj[key] = data[key];
    }
  }
  data.properties = new_obj;
  return data;
};

exports.delProp = (data, property = null) => {
  try {
    if (property === null) {
      return false;
    }

    let array = property;

    if (!Array.isArray(property)) {
      array = [property];
    }

    array.forEach((item) => {
      delete data[item];
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getDate = (date) => {
  return moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss');
};
