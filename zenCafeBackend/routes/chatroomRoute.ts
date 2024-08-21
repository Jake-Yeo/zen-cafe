const express = require("express");  //https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable
const chatroomRouter = express.Router();
const controller = require('../controllers/chatroomController.ts');

// reminder that order of the routes matter!

// create a chatroom
chatroomRouter.post('/createChatroom', controller.createChatroom);

// send a message to a chatroom
chatroomRouter.patch('/sendMessage', controller.sendMessage);

// Listen to the chatrooms
chatroomRouter.get('/changeStream/:chatroom_id', controller.chatroomChangeStream);

// Get a list of all the chatrooms
chatroomRouter.get('/getChatrooms', controller.getChatrooms);

// Get one chatroom via chatroom_id
chatroomRouter.get('/getChatroom/:chatroom_id', controller.getChatroom);

// Check if chatroom name is unique
chatroomRouter.post('/isChatroomNameUnique', controller.isChatroomNameUnique);

export default chatroomRouter;