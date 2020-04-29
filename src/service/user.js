const User = require('../models/user');
const { delProp } = require('../utils/tool');

/**
 * 判断用户是否存在
 */
exports.userIsExist = async ({
  user_name = null,
  password = null,
  user_id = null,
}) => {
  const whereOption = {};
  let require = false;
  if (user_name !== null) {
    whereOption['user_name'] = user_name;
    require = true;
  }
  if (password !== null) {
    whereOption['password'] = password;
  }
  if (user_id !== null) {
    whereOption['user_id'] = user_id;
    require = true;
  }
  if (require === false) {
    return null;
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

/**
 * 修改密码
 */
exports.update_pwd = async ({ user_id, password }) => {
  const result = await User.update(
    {
      password,
    },
    {
      where: {
        user_id,
      },
    }
  );
  return result[0] > 0;
};

/**
 * 更新用户信息
 */
exports.updateUserInfo = async ({ user_id, new_password, nick }) => {
  const option = {};
  if (nick !== null) {
    option['nick'] = nick;
  }
  if (new_password !== null) {
    option['password'] = new_password;
  }

  const result = await User.update(option, {
    where: {
      user_id,
    },
  });

  return result[0] > 0;
};
