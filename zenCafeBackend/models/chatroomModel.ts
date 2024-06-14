import mongoose from 'mongoose';
import messageSchema from './messageModel';

const chatroomSchema = new mongoose.Schema({
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
    messages: [messageSchema]
});

const Chatroom = mongoose.model("Chatroom", chatroomSchema); // collection automatically created will be called 'chatrooms'

export default Chatroom;