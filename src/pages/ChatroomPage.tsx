import { useParams } from "react-router-dom";
import Chatroom from "../objects/Chatroom";
import { ReactElement, useEffect, useState } from "react";
import { getChatroom } from "../functions/zenCafeChatroomsApi";
import { Stack, Typography } from "@mui/material";
import Message from "../objects/Message";
const { v4: uuidv4 } = require('uuid');

const ChatroomPage = () => {

    const { chatroomId } = useParams();

    const eventSource = new EventSource(`http://localhost:3000/chatrooms/changeStream/${chatroomId}`);

    eventSource.onmessage = function (event) {
        console.log("event received");
        console.log(event.data);

        const { newMessage } = JSON.parse(event.data)

        console.log(JSON.parse(event.data));
        console.log(newMessage);

        const { senderUsername, senderUid, message, _id } = newMessage;

        const newMessageObj = new Message(message, senderUsername, senderUid, _id);
        console.log(newMessageObj);

        chatroom.pushMessage(newMessageObj)
        setChatroom(chatroom);
    };

    const [chatroom, setChatroom] = useState(new Chatroom("", "", "", [], ""));

    useEffect(() => {
        const fetchData = async () => {

            if (!chatroomId) {
                console.error('ChatroomPage Error:', 'Please provide a chatroomId url param');
                return;
            }

            const chatroom = await getChatroom(chatroomId);

            if (!chatroom) {
                console.error('ChatroomPage Error:', 'Failed to get chatroom.');
                return;
            }

            setChatroom(chatroom);
        }

        fetchData();
    }, [])

    const messages: ReactElement[] = [];

    for (const message of chatroom.getMessages()) {
        messages.push(<Typography key={uuidv4()}>{message.getMessage()}</Typography>);
    }

    return (<>
        <Stack>
            {chatroom.getChatroomName()}
            {messages}
        </Stack>
    </>)
}

export default ChatroomPage