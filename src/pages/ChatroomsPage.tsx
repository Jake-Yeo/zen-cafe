import { Button, Dialog, Slide, Stack, TextField, Typography } from "@mui/material";
import { createChatroom, getChatrooms } from "../functions/zenCafeChatroomsApi"
import { JsxElement } from "typescript";
import { ReactElement, useContext, useEffect, useState } from "react";
import Chatroom from "../objects/Chatroom";
import ChatroomMetadata from "../objects/ChatroomMetadata";
import { useNavigate } from "react-router-dom";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { SingletonUserContext } from "../firebase/FirebaseApi";
import Background from "../components/sharedComponents/Background";
import ChatroomDetailCard from "../components/chatroomsPageComponents/ChatroomDetailCard";
const { v4: uuidv4 } = require('uuid');

const Transition = React.forwardRef(function Transition( // make sure this is not in the element itself or it will constantly be set again and again which ruins the sliding close animation!
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ChatroomsPage = () => {

    const navigate = useNavigate();

    const singletonUserContext = useContext(SingletonUserContext);

    const [isDialogueOpen, setIsDialogueOpen] = useState(false);

    const [chatrooms, setChatrooms] = useState<ChatroomMetadata[]>([]);

    var chatName = "";

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
            <ChatroomDetailCard chatroomMetadata={chatroom}/>);
    }

    return (<>
        <Background useBlur={true} useVignette={true}>
            <Stack>
                {chatroomDetailCardArray}
                <Button onClick={() => { setIsDialogueOpen(true) }}>Create Chatroom</Button>
                <Dialog
                    fullScreen
                    open={isDialogueOpen}
                    TransitionComponent={Transition}
                    onClose={() => { setIsDialogueOpen(false) }}>
                    <Button onClick={(e) => {
                        setIsDialogueOpen(false);
                    }}>Close</Button>
                    <TextField onChange={(e) => { chatName = e.target.value }} id="outlined-basic" label="Outlined" variant="outlined" />
                    <Button onClick={() => { createChatroom(chatName, singletonUserContext.user.getUsername(), singletonUserContext.user.getGoogleId()) }}>Create Chatroom</Button>
                </Dialog>
            </Stack>
        </Background>
    </>)
}

export default ChatroomsPage