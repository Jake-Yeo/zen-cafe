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

    // idea, send the sse event here anytime someone sends a message, then on frontend, check to make sure that event isn't one created by the user themselves, then we no longer need to check the database for updates

    // Requires: chatroomUid, username, userUid, message, as JSON in req.body
    // username: username of person sending the message
    // userUid: uid of the person sending the message
    sendMessage: async (req, res) => {
        try {

            const { chatroom_id, senderUsername, senderUid, message } = req.body;

            if (!chatroom_id || !senderUsername || !senderUid || !message) {
                return res.status(400).json({ message: 'Either forgot chatroom_id, senderUsername, message, or senderUid' });
            }

            const messageData =
            {
                senderUsername: senderUsername,
                senderUid: senderUid,
                message: message
            }

            const chatroom = await Chatroom.findByIdAndUpdate(
                chatroom_id,
                { $push: { messages: messageData } }, // The MongoDB $push operator adds messageJson to the messages array.
                { new: true, useFindAndModify: false } // These options ensure that the updated document is returned and avoid deprecated warnings for useFindAndModify.
            );

            res.status(200).json(chatroom);

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

    chatroomChangeStream: async (req, res) => {
        try {
            console.log("Someone connected");
            const { chatroom_id } = req.params;

            const chatroomIdString = chatroom_id as string;

            console.log(chatroomIdString);

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
                console.log("Something changed");
                const updatedFields = change.updateDescription.updatedFields;
                const updatedMessages = updatedFields.messages;

                // Send event to client using SSE format
                const eventData = JSON.stringify({ data: updatedMessages });

                // Send event to client using SSE format
                res.write(`data: ${eventData}\n\n`);
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