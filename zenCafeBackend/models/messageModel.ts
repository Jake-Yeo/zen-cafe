import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    username: { // person who sent message
        type: String,
        required: [true, "Please provide a username"],
    },
    uid: { // uid of person who sent message
        type: String,
        required: [true, "Please provide a uid"],
    },
    message: { // the message they sent
        type: String,
        required: [true, "Please provide a message"],
    }
},
    {
        timestamps: true // this time stamp if so we can track when the user creates a message, and when the user updates a message
    });

export default messageSchema;