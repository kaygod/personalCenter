const { addUser, userIsExist } = require('../service/user');
const { Success, Fail } = require('../models/Response');
const { md5 } = require('../utils/tool');

exports.register = async ({ user_name, password, nick }) => {
  const userInfo = await userIsExist({ user_name });
  if (userInfo !== null) {
    //用户已存在
    return new Fail('100', '用户已存在!');
  }
  const result = await addUser({ user_name, password: md5(password), nick });
  return new Success(result);
};
