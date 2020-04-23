const { Fail } = require('../models/Response');
/**
 * 数据要是{data:{}}如此形式的结构,否则或错误返回
 */
exports.parseDatafn = async (ctx, next) => {
  const { data } = ctx.request.body;
  const { method } = ctx.request;
  if (data || method == 'GET') {
    ctx.data = data;
    await next();
  } else {
    ctx.body = new Fail(50, '请求参数错误!');
  }
};
