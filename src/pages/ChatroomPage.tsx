import { useParams } from "react-router-dom";
import Chatroom from "../objects/Chatroom";
import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { getChatroom, sendMessage } from "../functions/zenCafeChatroomsApi";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Message from "../objects/Message";
import { SingletonUserContext } from "../firebase/FirebaseApi";
import Background from "../components/sharedComponents/Background";
import MessageDetailCard from "../components/chatroomPageComponents/MessageDetailCard";
import { VariableSizeList } from "react-window";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import VirtuosoElementList from "../components/sharedComponents/VirtuosoElementList";
const { v4: uuidv4 } = require('uuid');

var messageToSend = "";
var statelessChatroom = new Chatroom("", "", "", [], ""); // We have this because originally I was setting updating the chatroom variable that had state, then I would clone the chatroom and set it as the new chatroom to re-render
// That was not working because useState is asynchronous or something, so we couldn't use the previous version of the chatroom to update, so we use this instead.

const ChatroomPage = () => {

    const { chatroomId = '' } = useParams();

    const singletonUserContext = useContext(SingletonUserContext);

    const [chatroom, setChatroom] = useState(new Chatroom("", "", "", [], ""));

    // https://stackoverflow.com/questions/57982180/react-app-suddenly-stalling-in-dev-and-production always do the event source in the useEffect... or else there will be multiple open connections created which means you will not be able to send any requests (send messages) to the database!!!
    useEffect(() => {

        const eventSource = new EventSource(`http://localhost:3000/chatrooms/changeStream/${chatroomId}`);

        eventSource.onmessage = function (event) {
            console.log("event received");

            const { newMessage } = JSON.parse(event.data)

            const { senderUsername, senderUid, message, _id } = newMessage;

            const newMessageObj = new Message(message, senderUsername, senderUid, _id);

            statelessChatroom.pushMessage(newMessageObj);

            setChatroom(new Chatroom(statelessChatroom.getChatroomName(), statelessChatroom.getCreatorUsername(), statelessChatroom.getCreatorUid(), statelessChatroom.getMessages(), statelessChatroom.getChatroomId()));
        };
    }, [])

    useEffect(() => {
        //console.log(statelessChatroom.getMessages());
    }, [chatroom]);

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
            statelessChatroom = chatroom;
            setChatroom(chatroom);
        }

        fetchData();
    }, [])

    const messageDetailCardArr: ReactElement[] = [];

    for (const message of chatroom.getMessages()) {
        messageDetailCardArr.push(<MessageDetailCard key={uuidv4()} message={message} />);
    }


    return (
        <Background useBlur={true} useVignette={true}>
            <Stack
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {chatroom.getChatroomName()}
                <VirtuosoElementList elementArr={messageDetailCardArr} width="50%" widthOfItems="66.67%" scrollToBottomAtStart={true} />
                <TextField onChange={(e) => {
                    messageToSend = e.target.value;
                    console.log(messageToSend);
                }}>Message to send</TextField>
                <Button onClick={() => {
                    console.log(messageToSend);
                    console.log(chatroomId);
                    sendMessage(chatroomId, singletonUserContext.user.getUsername(), singletonUserContext.user.getGoogleId(), messageToSend)
                }}>Send Message</Button>
            </Stack>
        </Background>)
}

export default ChatroomPage