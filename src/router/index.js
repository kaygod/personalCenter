const { router: userRouter } = require('./user');

exports.runRoutes = (app) => {
  app.use(userRouter.routes());
};
