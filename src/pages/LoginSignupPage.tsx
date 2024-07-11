import { Box, Button, Stack, Typography } from "@mui/material";
import { logout, signInWithGoogle, SingletonUserContext } from "../firebase/FirebaseApi";
import { useContext } from "react";
import { getChatrooms } from "../functions/zenCafeChatroomsApi";
import { useNavigate, useRoutes } from "react-router-dom";
import Background from "../components/sharedComponents/Background";
import ZenCafeLogo from "../components/sharedComponents/ZenCafeLogo";
const { v4: uuidv4 } = require('uuid');


const LoginSignupPage = () => {

    const singletonUserContext = useContext(SingletonUserContext);

    const navigate = useNavigate();

    // Here we will pick which button to show based on if user is logged in or not, if they are lagged out in show login button, else show logout button
    var buttonToShow = !singletonUserContext.user ? // basically if (singltonUserContext.user)
        <Button
            onClick={signInWithGoogle}>Login With Google</Button> : // use this button
        [<Button key={uuidv4()}
            sx={{
                borderRadius: '5em',
                backgroundColor: '#903487',
                mixBlendMode: 'multiply',
                backdropFilter: 'blur(10px)',
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)"
            }}
            onClick={logout}>Logout</Button>, <Button key={uuidv4()} onClick={() => { navigate("/ChatroomsPage") }}>Go to Chatroom List</Button>];   // else use this button

    console.log(getChatrooms());

    return (<>
        <Background useVignette={true} useBlur={true} gifPath="/gif/cyberPunkCity.gif">
            <Stack>
                <ZenCafeLogo vh={35} />
                <Typography>Login/Signup</Typography>
                {buttonToShow}
            </Stack>
        </Background>
    </>);
}

export default LoginSignupPage;