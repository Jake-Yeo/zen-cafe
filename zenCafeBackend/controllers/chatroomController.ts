import Chatroom from "../models/chatroomModel";

module.exports = {
    createChatroom: async (req, res) => {
        try {
            const chatroom = await Chatroom.create(req.body);
            res.status(200).json(chatroom);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}