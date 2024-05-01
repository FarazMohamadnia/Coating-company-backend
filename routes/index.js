const express = require('express');
const app = express();
const apiRouter = express.Router();

//====import Routes====//
const commentsRouter = require('./comments/index.js');
const getPriceRouter = require('./ColorData/index.js');
const storyRouter = require('./Story/index');
const usersRouter = require('./users/index');
const ownerLogin = require('./owner/ownerLogin.js');

//====Router====//
apiRouter.use('/comments',commentsRouter);
apiRouter.use('/getPrice',getPriceRouter);
apiRouter.use('/Story',storyRouter);
apiRouter.use('/users',usersRouter);
apiRouter.use('/OwnerLogin',ownerLogin);


module.exports = apiRouter;