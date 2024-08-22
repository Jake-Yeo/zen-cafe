import mongoose from 'mongoose';
import messageSchema from './messageModel';
const { v4: uuidv4 } = require('uuid');

const chatroomSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true, // we may want to add the uuid ourselves and then store the uuid later instead of having it generate automatically via the default option
        default: uuidv4,
        unique: true, // Ensure uniqueness
    },
    chatroomName: { // name of the chatroom
        type: String,
        required: [true, 'must provide chatroom name'],
    },
    creatorUsername: {
        type: String,
        required: [true, 'must provide creator username'],
    },
    creatorUid: {
        type: String,
        required: [true, 'must provide creator uid'],
    },
    messages: {
        type: [messageSchema],
        required: [true, 'provide an array of messages'],
        default: [], // Default value is an empty array
    }
});

const Chatroom = mongoose.model("Chatroom", chatroomSchema); // collection automatically created will be called 'chatrooms'

export default Chatroom;