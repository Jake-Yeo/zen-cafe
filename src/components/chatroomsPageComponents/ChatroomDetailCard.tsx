import { Box, Stack, Typography } from "@mui/material"
import ChatroomMetadata from "../../objects/ChatroomMetadata"
import GlassButton from "../sharedComponents/GlassButton"
import { useNavigate } from "react-router-dom"
import FrostedButton from "../sharedComponents/FrostedButton"

interface props {
    chatroomMetadata: ChatroomMetadata,
}

const ChatroomDetailCard = ({ chatroomMetadata}: props) => {

    const navigate = useNavigate();

    return (
        <Box sx={{
            width: "100%",
            minWidth: "100px",
            paddingTop: "10px",
            paddingBottom: "10px",
        }}>
            <Stack sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: "20px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)"
            }}>
                <Stack sx={{
                    zIndex: 1,
                    color: "white",
                    overflow: 'hidden',
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    backdropFilter: 'blur(10px) saturate(150%)', // Apply the blur effect
                    width: "100%",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography sx={{ zIndex: 1, paddingTop: "5px", paddingBottom: "5px", fontSize: "12px",}}>
                        Chatroom: {chatroomMetadata.getChatroomName()}
                    </Typography>
                    <Typography sx={{ zIndex: 1, paddingTop: "5px", paddingBottom: "5px", fontSize: "12px",}}>
                        Created By: {chatroomMetadata.getCreatorUsername()}
                    </Typography>
                </Stack>
                <FrostedButton
                    text={"Join"}
                    borderTopLeftRadius="0em"
                    borderTopRightRadius="0em"
                    borderBottomLeftRadius="20px"
                    borderBottomRightRadius="20px"
                    boxShadow="none"
                    width="100%"
                    fontSize="12px"
                    padding="6px"
                    onClick={() => { navigate("/ChatroomPage/" + chatroomMetadata.getChatroomId()) }} />
            </Stack>
        </Box>)
}

export default ChatroomDetailCard