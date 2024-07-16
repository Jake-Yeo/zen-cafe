import { Box, Button, Stack, Typography } from "@mui/material";
import { logout, signInWithGoogle, SingletonUserContext } from "../firebase/FirebaseApi";
import { useContext } from "react";
import { getChatrooms } from "../functions/zenCafeChatroomsApi";
import { useNavigate, useRoutes } from "react-router-dom";
import Background from "../components/sharedComponents/Background";
import ZenCafeLogo from "../components/sharedComponents/ZenCafeLogo";
import GlassButton from "../components/sharedComponents/GlassButton";
import FrostedButton from "../components/sharedComponents/FrostedButton";
const { v4: uuidv4 } = require('uuid');


const LoginSignupPage = () => {

    const singletonUserContext = useContext(SingletonUserContext);

    const navigate = useNavigate();

    // Here we will pick which button to show based on if user is logged in or not, if they are logged out in show login button, else show logout button
    var buttonToShow = !singletonUserContext.user ? // basically if (singltonUserContext.user)
        <FrostedButton text={"Login With Google"} onClick={signInWithGoogle} marginBottom="20px" marginTop="20px" /> :
        [<FrostedButton key={uuidv4()} text={"logout"} onClick={logout} marginBottom="20px" marginTop="20px"/>, <FrostedButton key={uuidv4()} text={"Go to Chatroom List"} onClick={() => { navigate("/ChatroomsPage") }} />];   // else use this button
    console.log(getChatrooms());

    return (<>
        <Background useVignette={true} useBlur={true}>
            <Stack alignItems={"center"} justifyContent={"center"} height={"80%"}>
                <ZenCafeLogo vh={35} />
                {buttonToShow}
            </Stack>
        </Background>
    </>);
}

export default LoginSignupPage;