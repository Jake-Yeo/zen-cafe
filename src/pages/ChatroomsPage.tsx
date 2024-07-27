import { Button, Dialog, Slide, Stack, TextField, Typography } from "@mui/material";
import { createChatroom, getChatrooms } from "../functions/zenCafeChatroomsApi"
import { JsxElement } from "typescript";
import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import Chatroom from "../objects/Chatroom";
import ChatroomMetadata from "../objects/ChatroomMetadata";
import { useNavigate } from "react-router-dom";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { SingletonUserContext } from "../firebase/FirebaseApi";
import Background from "../components/sharedComponents/Background";
import ChatroomDetailCard from "../components/chatroomsPageComponents/ChatroomDetailCard";
import FrostedButton from "../components/sharedComponents/FrostedButton";
import { VariableSizeList } from "react-window";
import VirtuosoElementList from "../components/sharedComponents/VirtuosoElementList";
import { VirtuosoHandle } from "react-virtuoso";
import CreateChatroomButton from "../components/chatroomsPageComponents/CreateChatroomButton";
const { v4: uuidv4 } = require('uuid');

const ChatroomsPage = () => {

    const [chatrooms, setChatrooms] = useState<ChatroomMetadata[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const chatrooms = await getChatrooms();

            if (!chatrooms) {
                console.error('ChatroomsPage Error:', 'Failed to get Chatrooms with getChatrooms()');
                return;
            }

            setChatrooms(chatrooms);
        }

        fetchData();

    }, []);

    const chatroomDetailCardArray: ReactElement[] = [];

    for (const chatroom of chatrooms) {
        chatroomDetailCardArray.push(
            <ChatroomDetailCard chatroomMetadata={chatroom} />);
    }

    return (<>
        <Background useBlur={true} useVignette={true}>
            <Stack sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: "100%"
            }}>
                <VirtuosoElementList elementArr={chatroomDetailCardArray} width="75%" widthOfItems="66.67%"/>
                <CreateChatroomButton></CreateChatroomButton>
            </Stack>
        </Background>
    </>)
}

export default ChatroomsPage