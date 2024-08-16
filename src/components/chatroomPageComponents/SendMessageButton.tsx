import { Stack, TextField } from "@mui/material"
import FrostedButton from "../sharedComponents/FrostedButton"
import { MouseEventHandler } from "react"

interface props {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    onClick: MouseEventHandler<HTMLButtonElement>,
}

const SendMessageButton = ({ onChange, onClick }: props) => {
    return (<>
        <Stack spacing={1} direction={"row"} justifyContent={"end"} alignItems={"end"} height={"56px"}>
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
                onChange={onChange} id="outlined-basic" label="Message" variant="outlined" />
            <FrostedButton height={"100%"} onClick={onClick} minWidth={"0px"} width={"5em"} text={""} content={`url("/svgs/ChatroomSvgs/send.svg")`}></FrostedButton>
        </Stack>
    </>)
}

export default SendMessageButton