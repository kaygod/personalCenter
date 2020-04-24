const Router = require('@koa/router');
const { register, update_pwd, login } = require('../controller/user');
const { genValidator } = require('../middleWares/genValidator');
const { userValidate } = require('../validator/user');
const { genCaptcha } = require('../utils/genCaptcha');
const Auth = require('../middleWares/auth');

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

router.post('/login', genValidator(userValidate), async (ctx) => {
  const { user_name, password } = ctx.data;
  ctx.body = await login({ user_name, password, ctx });
});

router.post(
  '/update_pwd',
  new Auth().m,
  genValidator(userValidate),
  async (ctx) => {
    const { user_id, password, new_password } = ctx.data;
    ctx.body = await update_pwd({ user_id, password, new_password });
  }
);

exports.router = router;
