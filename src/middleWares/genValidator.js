const { Fail } = require('../models/Response');
exports.genValidator = (validateFn) => {
  return async (ctx, next) => {
    const data = ctx.data;
    const url = ctx.request.url;
    const error = validateFn(data, url.slice(url.lastIndexOf('/') + 1), ctx);
    if (error) {
      if (Array.isArray(error) && error.length > 0) {
        ctx.body = new Fail(50, error[0].message);
      } else {
        ctx.body = new Fail(50, '请求参数错误!');
      }
    } else {
      await next();
    }
  };
};
