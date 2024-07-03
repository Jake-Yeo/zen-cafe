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

    chatroomChangeStream: async (req, res) => {
        try {
            const pipeline = []; // Optionally define aggregation pipeline

            const changeStream = Chatroom.watch(pipeline);

            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            changeStream.on('change', (change) => {
                const eventData = JSON.stringify(change);

                // Send event to client using SSE format
                res.write(`data: testing\n\n`);
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