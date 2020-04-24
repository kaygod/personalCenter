const { addUser, userIsExist, update_pwd } = require('../service/user');
const { Success, Fail } = require('../models/Response');
const { md5, delProp, generateToken } = require('../utils/tool');

/**
 * 注册
 */
exports.register = async ({ user_name, password, nick }) => {
  const userInfo = await userIsExist({ user_name });
  if (userInfo !== null) {
    //用户已存在
    return new Fail('100', '用户已存在!');
  }
  const result = await addUser({ user_name, password: md5(password), nick });
  return new Success(result);
};

/**
 * 登录
 */
exports.login = async ({ user_name, password, ctx }) => {
  const userInfo = await userIsExist({ user_name, password: md5(password) });
  if (userInfo == null) {
    return new Fail('110', '用户名或密码错误!');
  }
  delProp(userInfo, ['password']);
  const token = generateToken(userInfo, 1);
  userInfo.token = token;
  return new Success(userInfo);
};

/**
 * 修改密码
 */
exports.update_pwd = async ({ user_id, password, new_password }) => {
  const userInfo = await userIsExist({ user_id, password: md5(password) });
  if (userInfo == null) {
    return new Fail('120', '旧密码错误!');
  }

  const result = update_pwd({ user_id, password: md5(new_password) });

  if (result) {
    return new Success();
  } else {
    return new Fail(166, '更新失败');
  }
};
