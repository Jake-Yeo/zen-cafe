import { Box, Button, Dialog, Slide, Stack, TextField, Typography } from "@mui/material";
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
import RadioUi from "../components/sharedComponents/Radio/RadioUi";
import Header from "../components/sharedComponents/Header";
const { v4: uuidv4 } = require('uuid');

const ChatroomsPage = () => {

    const navigate = useNavigate();

    const singletonUserContext = useContext(SingletonUserContext);

    if (!singletonUserContext.user) { // Check if person accessing this page is logged in first, if not then redirect them to the login page
        navigate("/loginSignupPage");
    }

    const [chatrooms, setChatrooms] = useState<ChatroomMetadata[]>([]);

    const fetchChatrooms = async () => {
        const chatrooms = await getChatrooms();

        if (!chatrooms) {
            console.error('ChatroomsPage Error:', 'Failed to get Chatrooms with getChatrooms()');
            return;
        }

        setChatrooms(chatrooms);
    }

    useEffect(() => {
        fetchChatrooms();
    }, []);

    const chatroomDetailCardArray: ReactElement[] = [];

    for (const chatroom of chatrooms) {
        chatroomDetailCardArray.push(
            <ChatroomDetailCard chatroomMetadata={chatroom} chatrooms={chatrooms} setChatrooms={setChatrooms} />);
    }

    return (<>
        <Background useBlur={true} useVignette={true}>
            <Stack
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: "100%",
                    height: "100%"
                }}>
                <Header />
                <Typography padding={"10px"} zIndex={1} color={"white"}>Chatrooms</Typography>
                <VirtuosoElementList elementArr={chatroomDetailCardArray} width="75%" widthOfItems="66.67%" />
                <Stack direction={"row"} width={"50%"}>
                    <CreateChatroomButton></CreateChatroomButton>
                    <FrostedButton text={"Refresh"} marginTop="20px" borderTopLeftRadius="0" borderBottomLeftRadius="0" onClick={fetchChatrooms}></FrostedButton>
                </Stack>
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, padding: "10px" }}>
                    <RadioUi></RadioUi>
                </Box>
            </Stack>
        </Background>
    </>)
}

export default ChatroomsPage