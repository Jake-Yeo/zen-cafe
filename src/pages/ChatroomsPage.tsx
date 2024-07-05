import { Stack, Typography } from "@mui/material";
import { getChatrooms } from "../functions/zenCafeChatroomsApi"
import { JsxElement } from "typescript";
import { ReactElement, useEffect, useState } from "react";
import Chatroom from "../objects/Chatroom";
import ChatroomMetadata from "../objects/ChatroomMetadata";


const ChatroomsPage = () => {

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
        typographyArray.push(<Typography>{chatroom.getChatroomId()}</Typography>);
    }

    return (<>
        <Stack>
            {typographyArray}
        </Stack>
    </>)
}

export default ChatroomsPage