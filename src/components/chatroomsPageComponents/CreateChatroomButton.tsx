import { Button, Dialog, Slide, Stack, TextField } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useContext, useState } from "react";
import FrostedButton from "../sharedComponents/FrostedButton";
import { createChatroom, isChatroomNameUnique, sendMessage } from "../../functions/zenCafeChatroomsApi";
import { SingletonUserContext } from "../../firebase/FirebaseApi";
import SendMessageButton from "../chatroomPageComponents/SendMessageButton";
import ChatroomMetadata from "../../objects/ChatroomMetadata";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../sharedComponents/CustomSnackbar";

const Transition = React.forwardRef(function Transition( // make sure this is not in the element itself or it will constantly be set again and again which ruins the sliding close animation!
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CreateChatroomButton = () => {

    const navigate = useNavigate();

    var chatroomName = "";

    const singletonUserContext = useContext(SingletonUserContext);

    const [isDialogueOpen, setIsDialogueOpen] = useState(false);

    const [openEmptyChatroomNameSnack, setOpenEmptyChatroomNameSnack] = useState(false);

    const [openNotUniqueSnack, setOpenNotUniqueSnack] = useState(false);


    const onClick = async () => {


        if (chatroomName.length == 0) { // we must check this if statement first because isChatroomNameUnique cannot handle empty strings!
            setOpenEmptyChatroomNameSnack(true);
            return;
        }

        const isCNU = await isChatroomNameUnique(chatroomName);

        if (isCNU == false || isCNU == null) {
            setOpenNotUniqueSnack(true);
            return;
        }

        const chatroomMetadata: ChatroomMetadata | null = await createChatroom(chatroomName, singletonUserContext.user.getUsername(), singletonUserContext.user.getGoogleId());

        // Have error if statements here
        if (chatroomMetadata) {
            await sendMessage(chatroomMetadata.getChatroomId(), chatroomMetadata.getCreatorUsername(), chatroomMetadata.getCreatorUid(), "initial message (to stop dupicate key error)", true);
            navigate(`/ChatroomPage/${chatroomMetadata.getChatroomId()}`); // go to chatroom after you create it
        }
    }

    return (<>
        <FrostedButton onClick={() => { setIsDialogueOpen(true); }} text={"Create Chatroom"} marginTop="20px" borderBottomRightRadius="0" borderTopRightRadius="0"/>
        <CustomSnackbar open={openEmptyChatroomNameSnack} setOpen={setOpenEmptyChatroomNameSnack} message={"Please give the Chatroom a name!"}></CustomSnackbar>
        <CustomSnackbar open={openNotUniqueSnack} setOpen={setOpenNotUniqueSnack} message={"Chatroom name not available!"}></CustomSnackbar>
        <Dialog
            components={{
                Backdrop: () => null // Remove the backdrop completely
            }}
            PaperProps={{
                sx: {
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(10px) saturate(200%)', // Apply the blur effect
                    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.7)', // Add a custom shadow
                },
            }}
            open={isDialogueOpen}
            TransitionComponent={Transition}
            onClose={() => { setIsDialogueOpen(false) }}>
            <Stack>
                <TextField
                    autoComplete="off"
                    InputLabelProps={{
                        sx: {
                            color: 'rgba(255, 255, 255, 0.5)', // Default label color
                            '&.Mui-focused': {
                                color: 'white', // Label color when focused
                            },
                        },
                    }}
                    InputProps={{
                        sx: {
                            color: 'white', // Text color
                        },
                    }}
                    sx={{
                        margin: "10px",
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'transparent', // Default border color
                                transition: 'border-color 0.3s ease', // Transition for border color
                                borderRadius: '5em', // Set the border radius for the input
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                                transition: 'border-color 0.3s ease', // Transition for background color
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                                transition: 'border-color 0.3s ease', // Transition for background color
                            },
                        },
                    }}
                    onChange={(e) => { chatroomName = e.target.value }} id="outlined-basic" label="Chatroom Name" variant="outlined" />
                <FrostedButton
                    width="90%"
                    marginTop="10px"
                    marginLeft="10px"
                    marginRight="10px"
                    marginBottom="10px"
                    onClick={onClick}
                    text={"Create Chatroom"} />
                <FrostedButton
                    width="90%"
                    marginTop="10px"
                    marginLeft="10px"
                    marginRight="10px"
                    marginBottom="10px"
                    onClick={(e) => { setIsDialogueOpen(false); }}
                    text={"Cancel"}
                />
            </Stack>
        </Dialog>
    </>)
}

export default CreateChatroomButton