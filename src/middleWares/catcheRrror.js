const { Fail } = require('../models/Response');
exports.catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log(error);
    ctx.body = new Fail(1, '服务器发生错误');
  }
};
