const User = require('../models/user');
const { delProp } = require('../utils/tool');

/**
 * 判断用户是否存在
 */
exports.userIsExist = async ({ user_name, password = null }) => {
  const whereOption = {
    user_name,
  };
  if (password !== null) {
    whereOption[password] = password;
  }
  const result = await User.findOne({
    where: whereOption,
    attributes: ['user_id', 'user_name', 'nick'],
  });
  if (result == null) {
    return result;
  }
  return result.dataValues;
};

exports.addUser = async ({ user_name, password, nick }) => {
  const result = await User.create({
    user_id: null,
    user_name,
    password,
    nick,
  });
  const data = result.dataValues;
  delProp(data, 'password');
  return data;
};
