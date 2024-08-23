import { Box, Stack, Typography } from "@mui/material"
import Message from "../../objects/Message"
import { useContext, useState } from "react";
import { SingletonUserContext } from "../../firebase/FirebaseApi";
import FrostedButton from "../sharedComponents/FrostedButton";
import { doesChatroomExist, sendMessage } from "../../functions/zenCafeChatroomsApi";
import CustomSnackbar from "../sharedComponents/CustomSnackbar";
import { useNavigate } from "react-router-dom";

interface props {
    message: Message
}

const MessageDetailCard = ({ message }: props) => {

    const singletonUserContext = useContext(SingletonUserContext);

    const navigate = useNavigate();

    const sentByUser = message.getSenderUid() === singletonUserContext.user.getGoogleId();
    //console.log(message.getSenderUid(), singletonUserContext.user.getGoogleId());
    //console.log(sentByUser);

    const [openChatroomNoLongerExistsSnack, setOpenChatroomNoLongerExistsSnack] = useState(false);

    const onDeleteButtonClick = async () => {
        try {
            if (await doesChatroomExist(message.getChatroomId())) {
                sendMessage(message.getChatroomId(), message.getSenderUsername(), message.getSenderUid(), message.getMessageId(), true);
            } else {
                setOpenChatroomNoLongerExistsSnack(true);
            }
        } catch (error) {
            if (error instanceof Error && error.message === 'Token Expired') {
                navigate("/loginSignupPage");
            }
        }
    }

    var boxStyling: React.CSSProperties = {};

    if (sentByUser) {
        boxStyling = {
            paddingLeft: "30px",
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end', // if the message was sent by the user, put the message to the right
        }
    } else {
        boxStyling = {
            paddingRight: "30px",
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start', // if the message wasn't sent by the user, put the message to the left
        }
    }

    return (
        <>
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
                    width: '100%',
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
                    <Typography whiteSpace={"pre-wrap"} sx={{
                        wordBreak: "break-all",
                        zIndex: 1,
                        margin: "4px",
                        color: "white"
                    }} >{message.getMessage()}</Typography>
                </Stack>
            </Box>
            <CustomSnackbar open={openChatroomNoLongerExistsSnack} setOpen={setOpenChatroomNoLongerExistsSnack} message={`This chatroom was deleted! Please go back to the chatrooms page!`}></CustomSnackbar>
        </>
    )

}

export default MessageDetailCard