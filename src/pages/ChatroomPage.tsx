import { useNavigate, useParams } from "react-router-dom";
import Chatroom from "../objects/Chatroom";
import { ReactElement, useContext, useEffect, useState } from "react";
import { doesChatroomExist, getChatroom, sendMessage } from "../functions/zenCafeChatroomsApi";
import { Box, Stack, Typography } from "@mui/material";
import Message from "../objects/Message";
import { SingletonUserContext } from "../firebase/FirebaseApi";
import Background from "../components/sharedComponents/Background";
import MessageDetailCard from "../components/chatroomPageComponents/MessageDetailCard";
import VirtuosoElementList from "../components/sharedComponents/VirtuosoElementList";
import SendMessageButton from "../components/chatroomPageComponents/SendMessageButton";
import Header from "../components/sharedComponents/Header";
import RadioUi from "../components/sharedComponents/Radio/RadioUi";
import CustomSnackbar from "../components/sharedComponents/CustomSnackbar";
import { zenCafeApiUrl } from "../functions/envVars";
const { v4: uuidv4 } = require('uuid');

var messageToSend = "";
var statelessChatroom = new Chatroom("", "", "", [], ""); // We have this because originally I was setting updating the chatroom variable that had state, then I would clone the chatroom and set it as the new chatroom to re-render
// That was not working because useState is asynchronous or something, so we couldn't use the previous version of the chatroom to update, so we use this instead.

const ChatroomPage = () => {

    const { chatroomId = '' } = useParams();

    const singletonUserContext = useContext(SingletonUserContext);

    const navigate = useNavigate();

    if (!singletonUserContext.user) { // Check if person accessing this page is logged in first, if not then redirect them to the login page
        navigate("/loginSignupPage");
    }

    const [chatroom, setChatroom] = useState(new Chatroom("", "", "", [], ""));

    const [openChatroomNoLongerExistsSnack, setOpenChatroomNoLongerExistsSnack] = useState(false);

    // https://stackoverflow.com/questions/57982180/react-app-suddenly-stalling-in-dev-and-production always do the event source in the useEffect... or else there will be multiple open connections created which means you will not be able to send any requests (send messages) to the database!!!
    useEffect(() => {

        // do a doesChatroomExist() call here for security reasons (cannot pass headers in eventSource)

        const eventSource = new EventSource(`${zenCafeApiUrl}/chatrooms/changeStream/${chatroomId}`);

        eventSource.onmessage = function (event) {
            console.log("event received");

            const { newMessage } = JSON.parse(event.data)

            const { senderUsername, senderUid, message, _id, chatroomId } = newMessage;

            var { deleted } = newMessage;

            if (!deleted) {
                deleted = false
            }

            const newMessageObj = new Message(message, senderUsername, senderUid, _id, deleted, chatroomId);

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

            try {
                const chatroom = await getChatroom(chatroomId);

                if (!chatroom) {
                    console.error('ChatroomPage Error:', 'Failed to get chatroom.');
                    return;
                }
                statelessChatroom = chatroom;
                setChatroom(chatroom);
            } catch (error) {
                if (error instanceof Error && error.message === 'Token Expired') {
                    navigate("/loginSignupPage");
                }
            }
        }

        fetchData();
    }, [])

    const messageDetailCardArr: ReactElement[] = [];

    for (const message of chatroom.getMessages()) {
        messageDetailCardArr.push(<MessageDetailCard key={uuidv4()} message={message} />);
    }

    const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        messageToSend = e.target.value;
        console.log(messageToSend);
    }

    const onSendMessageClick = async () => {
        try {
            if (await doesChatroomExist(chatroomId)) {
                sendMessage(chatroomId, singletonUserContext.user.getUsername(), singletonUserContext.user.getGoogleId(), messageToSend, false);
            } else {
                setOpenChatroomNoLongerExistsSnack(true);
            }
        } catch (error) {
            if (error instanceof Error && error.message === 'Token Expired') {
                navigate("/loginSignupPage/expired");
            }
        }
    }

    return (
        <Background useBlur={true} useVignette={true}>
            <Stack
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    height: '100%'
                }}
            >
                <Header />
                <Typography padding={"10px"} zIndex={1} color={"white"}>{"Chatroom: " + chatroom.getChatroomName()}</Typography>
                <VirtuosoElementList elementArr={messageDetailCardArr} width="50%" widthOfItems="66.67%" scrollToBottomAtStart={true} />
                <SendMessageButton onChange={onTextFieldChange} onClick={onSendMessageClick}></SendMessageButton>
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, padding: "10px" }}>
                    <RadioUi></RadioUi>
                </Box>
            </Stack>
            <CustomSnackbar open={openChatroomNoLongerExistsSnack} setOpen={setOpenChatroomNoLongerExistsSnack} message={`This chatroom was deleted! Please go back to the chatrooms page!`}></CustomSnackbar>
        </Background>)
}

export default ChatroomPage