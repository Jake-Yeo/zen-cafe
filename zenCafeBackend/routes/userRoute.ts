const express = require("express");
const userRouter = express.Router();
const controller = require('../controllers/userController.ts');

// create a chatroom
userRouter.post('/createUser', controller.createUser);
userRouter.get('/doesUserExist/:google_id', controller.doesUserExist);
userRouter.get('/getUser/:google_id', controller.getUser);
userRouter.get('/isTokenValid', controller.isTokenValid);

export default userRouter;