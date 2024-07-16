import { Box, Stack, Typography } from "@mui/material"
import Message from "../../objects/Message"
import { useContext } from "react";
import { SingletonUserContext } from "../../firebase/FirebaseApi";

interface props {
    message: Message
}

const MessageDetailCard = ({ message }: props) => {

    const singletonUserContext = useContext(SingletonUserContext);

    const sentByUser = message.getSenderUid() === singletonUserContext.user.getGoogleId();
    console.log(message.getSenderUid(), singletonUserContext.user.getGoogleId());
    console.log(sentByUser);

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
            sx={boxStyling}
        >
            <Stack sx={{
                borderRadius: "20px",
                backgroundColor: 'transparent',
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)",
                overflow: 'hidden',
                height: 'auto',
                width: '80%',
                backdropFilter: 'blur(10px) saturate(300%)',
                marginBottom: "20px"
            }}>
                <Typography sx={{
                    zIndex: 1,
                    margin: "4px",
                    color: "white"
                }} >{message.getSenderUsername()}</Typography>
                <Typography sx={{
                    zIndex: 1,
                    margin: "4px",
                    color: "white"
                }} >{message.getMessage()}</Typography>
            </Stack>
        </Box>)

}

export default MessageDetailCard