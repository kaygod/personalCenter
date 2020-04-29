const Router = require('@koa/router');
const {
  register,
  login,
  updateUserInfo,
  getInviteCode,
  updateInviteCode,
} = require('../controller/user');
const { genValidator } = require('../middleWares/genValidator');
const { userValidate } = require('../validator/user');
const { genCaptcha } = require('../utils/genCaptcha');
const Auth = require('../middleWares/auth');
const { Success } = require('../models/Response');

const router = new Router({
  prefix: '/api/user',
});

router.get('/getCaptcha', async (ctx) => {
  const { text, data } = genCaptcha(ctx);
  ctx.session.captcha = text;
  ctx.set('Content-Type', 'image/svg+xml');
  ctx.body = String(data);
});

router.post('/register', genValidator(userValidate), async (ctx) => {
  const { user_name, password, nick } = ctx.data;
  ctx.body = await register({ user_name, password, nick });
});

router.post('/user_info', new Auth().m, async (ctx) => {
  const { user_name, user_id, nick } = ctx.auth;
  ctx.body = new Success({
    user_id,
    user_name,
    nick,
  });
});

router.post('/login', genValidator(userValidate), async (ctx) => {
  const { user_name, password } = ctx.data;
  ctx.body = await login({ user_name, password, ctx });
});

router.post(
  '/update_user',
  new Auth().m,
  genValidator(userValidate),
  async (ctx) => {
    const { user_id, user_name } = ctx.auth;
    const { old_password = null, new_password = null, nick = null } = ctx.data;
    ctx.body = await updateUserInfo({
      user_id,
      user_name,
      old_password,
      new_password,
      nick,
    });
  }
);

router.post('/get_code', new Auth().m, async (ctx) => {
  const { user_name } = ctx.auth;
  ctx.body = await getInviteCode(user_name);
});

router.post(
  '/update_code',
  new Auth().m,
  genValidator(userValidate),
  async (ctx) => {
    const { user_name } = ctx.auth;
    const { code } = ctx.data;
    ctx.body = await updateInviteCode(user_name, code);
  }
);

router.post('/get_user', new Auth().m, async (ctx) => {
  const { user_id, user_name, nick } = ctx.auth;
  ctx.body = new Success({
    user_id,
    user_name,
    nick,
  });
});

exports.router = router;
