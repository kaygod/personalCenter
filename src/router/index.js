const { router: userRouter } = require('./user');
const { router:displineRouter } =  require("./displine");

exports.runRoutes = (app) => {
  app.use(userRouter.routes());
  app.use(displineRouter.routes());
};
