const Router = require('@koa/router');
const Auth = require('../middleWares/auth');
const { genValidator } = require('../middleWares/genValidator');
const { noteValidate } = require('../validator/user');
const { getDate } = require('../utils/tool');
const {
  getDeatil,
  getList,
  submmitData,
  updateData,
  delData,
} = require('../controller/note');

const router = new Router({
  prefix: '/api/cloud_note',
});

/**
 * 查询单个笔记详情
 */
router.post(
  '/note_detail',
  new Auth().m,
  genValidator(noteValidate),
  async (ctx) => {
    const { note_id } = ctx.data;
    const { user_id } = ctx.auth;
    ctx.body = await getDeatil(user_id, note_id);
  }
);

/**
 * 查询某用户的笔记列表
 */
router.post(
  '/get_nodes',
  new Auth().m,
  genValidator(noteValidate),
  async (ctx) => {
    const { user_id } = ctx.auth;
    ctx.body = await getList(user_id);
  }
);

/**
 * 提交笔记
 */
router.post(
  '/submmit_note',
  new Auth().m,
  genValidator(noteValidate),
  async (ctx) => {
    const { user_id } = ctx.auth;
    const { title, content } = ctx.data;
    ctx.body = await submmitData(user_id, title, content);
  }
);

/**
 * 更新笔记
 */
router.post(
  '/update_note',
  new Auth().m,
  genValidator(noteValidate),
  async (ctx) => {
    const { user_id } = ctx.auth;
    const { note_id, content } = ctx.data;
    ctx.body = await updateData(user_id, note_id, content);
  }
);

/**
 * 删除笔记
 */
router.post(
  '/del_note',
  new Auth().m,
  genValidator(noteValidate),
  async (ctx) => {
    const { user_id } = ctx.auth;
    const { note_id } = ctx.data;
    ctx.body = await delData(user_id, note_id);
  }
);
