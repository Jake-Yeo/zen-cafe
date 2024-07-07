import { useParams } from "react-router-dom";
import Chatroom from "../objects/Chatroom";
import { ReactElement, useContext, useEffect, useState } from "react";
import { getChatroom, sendMessage } from "../functions/zenCafeChatroomsApi";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Message from "../objects/Message";
import { SingletonUserContext } from "../firebase/FirebaseApi";
const { v4: uuidv4 } = require('uuid');

var messageToSend = "";

const ChatroomPage = () => {

    const { chatroomId = '' } = useParams();

    const singletonUserContext = useContext(SingletonUserContext);

    // https://stackoverflow.com/questions/57982180/react-app-suddenly-stalling-in-dev-and-production always do the event source in the useEffect... or else there will be multiple open connections created which means you will not be able to send any requests (send messages) to the database!!!
    useEffect(() => {
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
    }, [])

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
            <TextField onChange={(e) => {
                messageToSend = e.target.value;
                console.log(messageToSend);
            }}>Message to send</TextField>
            <Button onClick={() => {
                console.log(messageToSend);
                console.log(chatroomId);
                sendMessage(chatroomId, "test1", "another test...", messageToSend)
            }}>Send Message</Button>
        </Stack>
    </>)
}

export default ChatroomPage