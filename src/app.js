const Koa = require('koa');
const app = new Koa();
const path = require('path');
const { runRoutes } = require('./router');
const { parseDatafn } = require('./middleWares/parmasParse');
const { catchError } = require('./middleWares/catcheRrror');
const { configSession } = require('./utils/setSession');
const bodyParser = require('koa-bodyparser');
require('./utils/sync');

app.use(catchError);
configSession(app);
app.use(bodyParser());
app.use(require('koa-static')(path.join(__dirname, './static')));
app.use(parseDatafn);
runRoutes(app);

// response
app.use((ctx) => {
  ctx.body = 'Hello Koa';
});

app.listen(8081);
