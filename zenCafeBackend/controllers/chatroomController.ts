import Chatroom from "../models/chatroomModel";

module.exports = {

    // For this project, we will pass all data to the api via JSON in the req.body

    // Requires: chatroomName, creatorUsername, creatorUid, as JSON in req.body
    createChatroom: async (req, res) => {
        try {

            const { chatroomName, creatorUsername, creatorUid } = req.body;

            if (!chatroomName || !creatorUsername || !creatorUid) {
                return res.status(400).json({ message: 'Either forgot chatroomName, creatorUsername, or creatorUid' });
            }

            const newChatData =
            {
                chatroomName: chatroomName,
                creatorUsername: creatorUsername,
                creatorUid: creatorUid,
            }

            const chatroom = await Chatroom.create(newChatData);
            res.status(200).json(chatroom);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    isChatroomNameUnique: async (req, res) => {
        try {

            const { chatroomName } = req.body;

            if (!chatroomName) {
                return res.status(400).json({ message: 'Forgot to provide chatroomName' });
            }

            const chatroomWithProvidedName = await Chatroom.findOne({ chatroomName: chatroomName });;

            var isChatroomNameUnique =
            {
                isChatroomNameUnique: true,
            }
            if (chatroomWithProvidedName) {
                isChatroomNameUnique =
                {
                    isChatroomNameUnique: false,
                }
            }

            res.status(200).json(isChatroomNameUnique);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // idea, send the sse event here anytime someone sends a message, then on frontend, check to make sure that event isn't one created by the user themselves, then we no longer need to check the database for updates

    // Requires: chatroomUid, username, userUid, message, as JSON in req.body
    // username: username of person sending the message
    // userUid: uid of the person sending the message
    sendMessage: async (req, res) => {
        try {
            console.log("message received");
            const { chatroom_id, senderUsername, senderUid, message, deleted } = req.body;

            console.log("point 1");
            console.log("senderusername: ", senderUid);
            if (!chatroom_id || !senderUsername || !senderUid || !message || deleted === undefined || deleted === null) { // we cannot do !deleted like the rest since it's a boolean value
                return res.status(400).json({ message: 'Either forgot chatroom_id, senderUsername, message, deleted, or senderUid' });
            }
            console.log("point 2");
            const messageData =
            {
                chatroomId: chatroom_id,
                senderUsername: senderUsername,
                senderUid: senderUid,
                message: message,
                deleted: deleted,
            }

            const chatroom = await Chatroom.findByIdAndUpdate(
                chatroom_id,
                { $push: { messages: messageData } }, // The MongoDB $push operator adds messageJson to the messages array.
                { new: true, useFindAndModify: false } // These options ensure that the updated document is returned and avoid deprecated warnings for useFindAndModify.
            );
            console.log("Chatroom found and updated with new message");
            res.status(200).json(chatroom);  // comment this out because too many messages to send back! Response never finishes! Tbh idk why getting things back from patch is so slow
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getChatrooms: async (req, res) => {
        try {
            const chatrooms = await Chatroom.find({}, { chatroomName: 1, creatorUsername: 1, creatorUid: 1 });
            res.status(200).json(chatrooms);
        } catch (error) {
            console.error('Failed to get chatrooms', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getChatroom: async (req, res) => {
        try {
            const { chatroom_id } = req.params;

            if (!chatroom_id) {
                return res.status(400).json({ message: 'Please provide chatroom_id!' });
            }

            const chatroom = await Chatroom.findById(chatroom_id);

            if (!chatroom) {
                return res.status(400).json({ message: 'No chatroom exists with that id!' });
            }

            res.status(200).json(chatroom);

        } catch (error) {
            console.error('Failed to get chatroom', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    doesChatroomExist: async (req, res) => {
        try {
            const { chatroom_id } = req.params;

            const chatroom = await Chatroom.findById(chatroom_id);

            var doesChatroomExist = {
                doesChatroomExist: false
            }

            if (chatroom) {
                doesChatroomExist = {
                    doesChatroomExist: true
                }
            }

            res.status(200).json(doesChatroomExist);

        } catch (error) {
            console.error('Error in deleteChatroom:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteChatroom: async (req, res) => {
        try {
            const { chatroom_id } = req.params;

            const chatroom = await Chatroom.findByIdAndDelete(chatroom_id);

            if (!chatroom) {
                return res.status(400).json({ message: 'No chatroom exists with that id!' });
            }

            res.status(200).json({ message: 'Deleted Successfully' });

        } catch (error) {
            console.error('Error in deleteChatroom:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    chatroomChangeStream: async (req, res) => {
        console.log("connection established");
        try {
            const { chatroom_id } = req.params;

            const chatroomIdString = chatroom_id as string;

            const pipeline = [ // https://stackoverflow.com/questions/59449079/mongodb-changestream-pipeline-not-working
                {
                    "$match": {
                        "fullDocument._id": chatroomIdString
                    }
                }]

            const changeStream = Chatroom.watch(pipeline, { fullDocument: 'updateLookup' });

            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            changeStream.on('change', (change) => {
                //  const eventData = JSON.stringify(change);
                console.log("change detected");
                const chatroomDocument = change.fullDocument;
                const messages = chatroomDocument.messages;
                const newMessage = messages[messages.length - 1];

                // Send event to client using SSE format
                const eventData = JSON.stringify({ newMessage });

                // Send event to client using SSE format
                res.write(`data: ${eventData}\n\n`); // must say 'data' not something else or it will not work (has to be in format of sse)
            });

            // Handle client disconnection
            req.on('close', () => {
                changeStream.close(); // Close change stream when client disconnects
                res.end(); // End response stream
            });

        } catch (error) {
            console.error('Error in chatroomChangeStream:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}