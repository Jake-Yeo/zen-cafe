import { Box, Stack, Typography } from "@mui/material"
import ChatroomMetadata from "../../objects/ChatroomMetadata"
import { useNavigate } from "react-router-dom"
import FrostedButton from "../sharedComponents/FrostedButton"
import { deleteChatroom, doesChatroomExist } from "../../functions/zenCafeChatroomsApi"
import { SetStateAction, useContext, useState } from "react"
import CustomSnackbar from "../sharedComponents/CustomSnackbar"
import { SingletonUserContext } from "../../firebase/FirebaseApi"

interface props {
    chatroomMetadata: ChatroomMetadata,
}

const ChatroomDetailCard = ({ chatroomMetadata }: props) => {

    const navigate = useNavigate();

    const [openChatroomDeletedSnack, setOpenEmptyChatroomNameSnack] = useState(false);

    const singletonUserContext = useContext(SingletonUserContext);

    const isCreatedByUser = chatroomMetadata.getCreatorUid() === singletonUserContext.user.getGoogleId();

    const onClickJoin = async () => {
        if (await doesChatroomExist(chatroomMetadata.getChatroomId())) {
            navigate("/ChatroomPage/" + chatroomMetadata.getChatroomId())
        } else {
            setOpenEmptyChatroomNameSnack(true);
        }
    }

    const onClickDeleteChatroom = async () => {
        if (await doesChatroomExist(chatroomMetadata.getChatroomId())) {
            deleteChatroom(chatroomMetadata.getChatroomId());
        } else {
            setOpenEmptyChatroomNameSnack(true);
        }
    }

    return (
        <>
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
                        <Typography sx={{ zIndex: 1, paddingTop: "5px", paddingBottom: "5px", fontSize: "12px", }}>
                            Chatroom: {chatroomMetadata.getChatroomName()}
                        </Typography>
                        <Typography sx={{ zIndex: 1, paddingTop: "5px", paddingBottom: "5px", fontSize: "12px", }}>
                            Created By: {chatroomMetadata.getCreatorUsername()}
                        </Typography>
                    </Stack>
                    <Stack direction="row" width="100%">
                        {
                            isCreatedByUser ?
                                <>
                                    < FrostedButton
                                        text={"Join"}
                                        borderTopLeftRadius="0em"
                                        borderTopRightRadius="0em"
                                        borderBottomLeftRadius="20px"
                                        borderBottomRightRadius="0"
                                        boxShadow="none"
                                        width="100%"
                                        fontSize="12px"
                                        padding="6px"
                                        onClick={onClickJoin} />
                                    <FrostedButton
                                        text={"Delete"}
                                        borderTopLeftRadius="0em"
                                        borderTopRightRadius="0em"
                                        borderBottomLeftRadius="0"
                                        borderBottomRightRadius="20px"
                                        boxShadow="none"
                                        width="25%"
                                        fontSize="12px"
                                        padding="6px"
                                        onClick={onClickDeleteChatroom} />
                                </>
                                :
                                < FrostedButton
                                    text={"Join"}
                                    borderTopLeftRadius="0em"
                                    borderTopRightRadius="0em"
                                    borderBottomLeftRadius="20px"
                                    borderBottomRightRadius="20px"
                                    boxShadow="none"
                                    width="100%"
                                    fontSize="12px"
                                    padding="6px"
                                    onClick={onClickJoin} />
                        }
                    </Stack>
                </Stack>
            </Box>
            <CustomSnackbar open={openChatroomDeletedSnack} setOpen={setOpenEmptyChatroomNameSnack} message={`Chatroom "${chatroomMetadata.getChatroomName()}" no longer exists! Please refresh the page!`}></CustomSnackbar>
        </>)
}

export default ChatroomDetailCard