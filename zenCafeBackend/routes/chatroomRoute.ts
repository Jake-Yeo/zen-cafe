const express = require("express");  //https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable
const chatroomRouter = express.Router();
const controller = require('../controllers/chatroomController.ts');

// reminder that order of the routes matter!

// create a chatroom
chatroomRouter.post('/createChatroom', controller.createChatroom);

// send a message to a chatroom
chatroomRouter.patch('/sendMessage', controller.sendMessage);

chatroomRouter.get('/changeStream', controller.chatroomChangeStream);

export default chatroomRouter;