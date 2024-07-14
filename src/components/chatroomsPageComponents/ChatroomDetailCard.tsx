import { Box, Stack, Typography } from "@mui/material"
import ChatroomMetadata from "../../objects/ChatroomMetadata"
import GlassButton from "../sharedComponents/GlassButton"
import { useNavigate } from "react-router-dom"

interface props {
    chatroomMetadata: ChatroomMetadata
}

const ChatroomDetailCard = ({ chatroomMetadata }: props) => {

    const navigate = useNavigate();

    return (
        <Box sx={{
            width: "50vw",
            minWidth: "100px",
            paddingTop: "10px",
            paddingBottom: "10px",
            //  borderRadius: '5em',
            // boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)",
            // mixBlendMode: 'multiply',
            // backdropFilter: 'blur(10px)',
            // backgroundColor: '#903487',
        }}>
            <Stack sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Stack sx={{
                    zIndex: 1,
                    color: "white",
                    overflow: 'hidden',
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    backdropFilter: 'blur(20px)',
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
                <GlassButton
                    text={"Join"}
                    borderTopLeftRadius="0em"
                    borderTopRightRadius="0em"
                    borderBottomLeftRadius="20px"
                    borderBottomRightRadius="20px"
                    fontSize="12px"
                    padding="6px"
                    onClick={() => { navigate("/ChatroomPage/" + chatroomMetadata.getChatroomId()) }} />
            </Stack>
        </Box>)
}

export default ChatroomDetailCard