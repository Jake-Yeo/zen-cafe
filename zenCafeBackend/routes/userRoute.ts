const express = require("express");
const userRouter = express.Router();
const controller = require('../controllers/userController.ts');

// create a chatroom
userRouter.post('/createUser', controller.createUser);

export default userRouter;