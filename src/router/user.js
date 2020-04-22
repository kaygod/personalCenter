const Router = require('@koa/router');
const { code } = require('../config/invite_code');
const { register } = require('../controller/user');
const { genValidator } = require('../middleWares/genValidator');
const { userValidate } = require('../validator/user');

const router = new Router({
  prefix: '/api/user',
});

router.post('/register', genValidator(userValidate), async (ctx) => {
  const { user_name, password, nick, invite_code } = ctx.request.body;
  ctx.body = await register({ user_name, password, nick });
});

exports.router = router;
