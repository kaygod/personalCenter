const {
  addUser,
  userIsExist,
  update_pwd,
  updateUserInfo,
} = require('../service/user');
const { Success, Fail } = require('../models/Response');
const { md5, delProp, generateToken } = require('../utils/tool');
const fs = require('fs');
const path = require('path');
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

/**
 * 更新用户信息
 */
exports.updateUserInfo = async ({
  user_id,
  user_name,
  old_password,
  new_password,
  nick,
}) => {
  const result = await userIsExist({
    user_id,
    password: old_password == null ? null : md5(old_password),
  });

  if (result === null) {
    return new Fail('180', '密码错误!');
  }

  const flag = await updateUserInfo({
    user_id,
    new_password: new_password == null ? null : md5(new_password),
    nick,
  });

  if (flag === false) {
    //更新失败
    return new Fail('190', '更新用户信息失败');
  }

  const userInfo = {
    user_id,
    user_name,
    nick,
  };

  const token = generateToken(userInfo, 1);
  userInfo.token = token;
  return new Success(userInfo);
};

/**
 * 获取邀请码
 */
exports.getInviteCode = (user_name) => {
  if (user_name == 'root') {
    //如果是超级管理员才可以查看邀请码
    delete require.cache[require.resolve('../config/invite_code.js')];
    const { code } = require('../config/invite_code.js');
    return new Success({ code });
  } else {
    return new Fail(148, '您没有权限查看邀请码!');
  }
};

/**
 * 更新邀请码
 */
exports.updateInviteCode = async (user_name, code) => {
  if (user_name == 'root') {
    //如果是超级管理员才可以更改邀请码
    return new Promise((resolve) => {
      fs.writeFile(
        path.join(__dirname, '../config/invite_code.js'),
        `exports.code='${code}';`,
        (err) => {
          if (err) {
            resolve(new Fail('168', '更改邀请码失败'));
            return false;
          }
          resolve(new Success());
        }
      );
    });
  } else {
    return new Fail(148, '您没有权限查看邀请码!');
  }
};
