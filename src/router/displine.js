const Router = require('@koa/router');
const Auth = require('../middleWares/auth');
const { genValidator } = require('../middleWares/genValidator');
const { displineValidate } = require('../validator/displine');
const { getDate } = require('../utils/tool');
const { set, get, del } = require('../utils/_redis');
const { Success } = require('../models/Response');
const moment = require('moment');
const {
  getTodo,
  punchClock,
  getMonthRecords,
} = require('../controller/displine');

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
    const { user_id } = ctx.auth;
    const key = `${user_id}_displine`;
    const now_date = moment().format('YYYY-MM-DD');
    const result = await get(key);
    if (result) {
      const { data_source, date } = result;
      if (date == now_date) {
        ctx.body = new Success(data_source);
        return false;
      } else {
        del(key);
      }
    }
    const { date } = ctx.data;
    const data = await getTodo(user_id, date);
    ctx.body = data;
    set(key, {
      date: now_date,
      data_source: data.data,
    });
  }
);

/**
 * 获取某一个月份的打卡记录
 */
router.post(
  '/month_records',
  new Auth().m,
  genValidator(displineValidate),
  async (ctx) => {
    const { user_id } = ctx.auth;
    const { month, year } = ctx.data;
    ctx.body = await getMonthRecords({ user_id, month, year });
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
    const key = `${user_id}_displine`;
    del(key);
  }
);

exports.router = router;
