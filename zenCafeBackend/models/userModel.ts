import mongoose from 'mongoose';
const { v4: uuidv4 } = require('uuid');

// need to keep track of users so we know who can and can't access the mongoDB
const userSchema = new mongoose.Schema({
    _id: { // This will be the id provided by google
        type: String,
        required: [true, "Please provide their google uid"], // we may want to add the uuid ourselves and then store the uuid later instead of having it generate automatically via the default option
        unique: true, // Ensure uniqueness
    },
    legalName: {
        type: String,
        required: [true, "Please provide their legal name"],
    },
    username: {
        type: String,
        required: [true, "Please provide a username"]
    }
})

const User = mongoose.model("User", userSchema); // collection automatically created will be called 'chatrooms'

export default User;