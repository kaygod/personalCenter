const { router: userRouter } = require('./user');
const { router: displineRouter } = require('./displine');
const { router: noteRouter } = require('./note');

exports.runRoutes = (app) => {
  app.use(userRouter.routes());
  app.use(displineRouter.routes());
  app.use(noteRouter.routes());
};
