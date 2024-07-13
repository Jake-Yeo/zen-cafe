import { Box, Button, Stack, Typography } from "@mui/material";
import { logout, signInWithGoogle, SingletonUserContext } from "../firebase/FirebaseApi";
import { useContext } from "react";
import { getChatrooms } from "../functions/zenCafeChatroomsApi";
import { useNavigate, useRoutes } from "react-router-dom";
import Background from "../components/sharedComponents/Background";
import ZenCafeLogo from "../components/sharedComponents/ZenCafeLogo";
import GlassButton from "../components/sharedComponents/GlassButton";
const { v4: uuidv4 } = require('uuid');


const LoginSignupPage = () => {

    const singletonUserContext = useContext(SingletonUserContext);

    const navigate = useNavigate();

    // Here we will pick which button to show based on if user is logged in or not, if they are lagged out in show login button, else show logout button
    var buttonToShow = !singletonUserContext.user ? // basically if (singltonUserContext.user)
        <GlassButton text={"Login With Google"} onClick={signInWithGoogle} /> :
        [<GlassButton text={"logout"} onClick={logout} marginBottom="20px"/>, <GlassButton text={"Go to Chatroom List"} onClick={() => { navigate("/ChatroomsPage") }} />];   // else use this button
    console.log(getChatrooms());

    return (<>
        <Background useVignette={true} useBlur={true} gifPath="/gif/cyberPunkCity.gif">
            <Stack alignItems={"center"} justifyContent={"center"} height={"80%"}>
                <ZenCafeLogo vh={35} />
                <Typography>Login/Signup</Typography>
                {buttonToShow}
            </Stack>
        </Background>
    </>);
}

export default LoginSignupPage;