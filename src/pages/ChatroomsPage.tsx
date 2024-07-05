import { Button, Stack, Typography } from "@mui/material";
import { getChatrooms } from "../functions/zenCafeChatroomsApi"
import { JsxElement } from "typescript";
import { ReactElement, useEffect, useState } from "react";
import Chatroom from "../objects/Chatroom";
import ChatroomMetadata from "../objects/ChatroomMetadata";
import { useNavigate } from "react-router-dom";
const { v4: uuidv4 } = require('uuid');


const ChatroomsPage = () => {

    const navigate = useNavigate();

    const [chatrooms, setChatrooms] = useState<ChatroomMetadata[]>([]);

    useEffect(() => {
        const setChatroomsFromDB = async () => {
            const chatrooms = await getChatrooms();

            if (!chatrooms) {
                console.error('ChatroomsPage Error:', 'Failed to get Chatrooms with getChatrooms()');
                return;
            }

            setChatrooms(chatrooms);
        }

        setChatroomsFromDB();

    }, []);

    const typographyArray: ReactElement[] = [];

    for (const chatroom of chatrooms) {
        typographyArray.push(
            <Button
                key={uuidv4()}
                onClick={() => { navigate("/ChatroomPage/" + chatroom.getChatroomId()) }}>
                {"Name: " + chatroom.getChatroomName() + " Id: " + chatroom.getChatroomId()}
            </Button>);
    }

    return (<>
        <Stack>
            {typographyArray}
            <Button>Create Chatroom</Button>
        </Stack>
    </>)
}

export default ChatroomsPage