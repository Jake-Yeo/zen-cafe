import { Box, Stack, Typography } from "@mui/material"
import Message from "../../objects/Message"
import { useContext } from "react";
import { SingletonUserContext } from "../../firebase/FirebaseApi";
import FrostedButton from "../sharedComponents/FrostedButton";
import { sendMessage } from "../../functions/zenCafeChatroomsApi";

interface props {
    message: Message
}

const MessageDetailCard = ({ message }: props) => {

    const singletonUserContext = useContext(SingletonUserContext);

    const sentByUser = message.getSenderUid() === singletonUserContext.user.getGoogleId();
    //console.log(message.getSenderUid(), singletonUserContext.user.getGoogleId());
    //console.log(sentByUser);

    const onDeleteButtonClick = () => {
        sendMessage(message.getChatroomId(), message.getSenderUsername(), message.getSenderUid(), message.getMessageId(), true);
    }

    var boxStyling: React.CSSProperties = {};

    if (sentByUser) {
        boxStyling = {
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end', // if the message was sent by the user, put the message to the right
        }
    } else {
        boxStyling = {
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start', // if the message wasn't sent by the user, put the message to the left
        }
    }

    return (
        <Box
            sx={{
                ...boxStyling,
                paddingBottom: "20px"
            }}
        >
            <Stack sx={{
                borderRadius: "20px",
                backgroundColor: 'transparent',
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)",
                overflow: 'hidden',
                height: 'auto',
                width: '90%',
                backdropFilter: 'blur(10px) saturate(300%)',
                padding: "10px",
            }}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography sx={{
                        zIndex: 1,
                        margin: "4px",
                        color: "white"
                    }} >{message.getSenderUsername()}</Typography>
                    {sentByUser ?
                        <FrostedButton onClick={onDeleteButtonClick} text={""} content={`url("/svgs/ChatroomSvgs/trashbin.svg")`} minWidth="0px" width="35px" height="35px" /> :
                        <></>}
                </Stack>
                <Typography sx={{
                    zIndex: 1,
                    margin: "4px",
                    color: "white"
                }} >{message.getMessage()}</Typography>
            </Stack>
        </Box>)

}

export default MessageDetailCard