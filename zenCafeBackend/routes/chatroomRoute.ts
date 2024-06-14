const express = require("express");  //https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable
const Chatroom = require("../models/chatroomModel.ts");
const chatroomRouter = express.Router();
const controller = require('../controllers/chatroomController.ts');

// create a chatroom
chatroomRouter.post('/', controller.createChatroom);

export default chatroomRouter;