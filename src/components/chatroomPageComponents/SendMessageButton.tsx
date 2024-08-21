import { Alert, Button, IconButton, Snackbar, SnackbarCloseReason, Stack, TextField } from "@mui/material"
import FrostedButton from "../sharedComponents/FrostedButton"
import { MouseEventHandler, useRef, useState } from "react"
import React from "react";
import CustomSnackbar from "../sharedComponents/CustomSnackbar";

interface props {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    onClick: () => void,
}
const SendMessageButton = ({ onChange, onClick }: props) => {

    const textFieldRef = useRef(null);
    const [textContent, setTextContent] = useState("");
    const [messageSnackOpen, setMessageSnackOpen] = useState(false);

    const onSend = () => {
        if (textContent.length != 0) {
            onClick();
            setTextContent("");
        } else {
            setMessageSnackOpen(true);
        }
    }

    return (<>
        <Stack spacing={1} direction={"row"} justifyContent={"end"} alignItems={"end"} height={"56px"}>
            <TextField
                value={textContent}
                ref={textFieldRef}
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
                    margin: "0px",
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white', // Default border color
                            transition: 'border-color 0.3s ease', // Transition for border color
                            borderRadius: '5em 5em 5em 5em', // Set the border radius for the input
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
                onChange={(e) => {
                    onChange(e)
                    setTextContent(e.target.value);
                }} id="outlined-basic" label="Message" variant="outlined"
                onKeyUp={
                    (e) => {
                        if (e.key === 'Enter') {
                            onSend();
                        }
                    }
                }
            />
            <FrostedButton height={"100%"} onClick={
                () => {
                    onSend();
                }
            } minWidth={"0px"} width={"5em"} text={""} content={`url("/svgs/ChatroomSvgs/send.svg")`}></FrostedButton>
            <CustomSnackbar open={messageSnackOpen} setOpen={setMessageSnackOpen} message={"Type a message first!"}></CustomSnackbar>
        </Stack>
    </>)
}

export default SendMessageButton