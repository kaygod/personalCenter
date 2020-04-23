const Router = require('@koa/router');

const router = new Router({
  prefix: '/api/displine',
});

/**
 * 获取某一天的打卡记录
 */
router.post('/api/get_todo', async (ctx) => {
  const { user_id, date } = ctx.data;
  ctx.body = getTodo(user_id, date);
});

/**
 * 开始打卡
 */
router.post('/api/clock', async (ctx) => {
  const { user_id, date, tasks } = ctx.data;
  ctx.body = punchClock({ user_id, date, tasks });
});

exports.router = router;
