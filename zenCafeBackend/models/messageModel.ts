import mongoose from 'mongoose';
const { v4: uuidv4 } = require('uuid');

const messageSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true, // we may want to add the uuid ourselves and then store the uuid later instead of having it generate automatically via the default option
        default: uuidv4,
        unique: true, // Ensure uniqueness
    },
    senderUsername: { // person who sent message
        type: String,
        required: [true, "Please provide a username"],
    },
    senderUid: { // uid of person who sent message
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