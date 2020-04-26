const Router = require('@koa/router');
const Auth = require('../middleWares/auth');
const { genValidator } = require('../middleWares/genValidator');
const { displineValidate } = require('../validator/displine');
const { getDate } = require('../utils/tool');
const { getTodo, punchClock } = require('../controller/displine');

const router = new Router({
  prefix: '/api/displine',
});

/**
 * 获取某一天的打卡记录
 */
router.post(
  '/get_todo',
  new Auth().m,
  genValidator(displineValidate),
  async (ctx) => {
    const { date } = ctx.data;
    const { user_id } = ctx.auth;
    ctx.body = await getTodo(user_id, date);
  }
);

/**
 * 提交当天的工作内容
 */
router.post(
  '/clock',
  new Auth().m,
  genValidator(displineValidate),
  async (ctx) => {
    const { user_id } = ctx.auth;
    const { tasks = [], declaration = '', is_record } = ctx.data;
    const date = getDate(new Date().getTime());
    ctx.body = await punchClock({
      user_id,
      date,
      tasks,
      declaration,
      is_record,
    });
  }
);

exports.router = router;
