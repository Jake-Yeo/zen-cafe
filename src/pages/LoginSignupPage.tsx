import { Button, Stack, Typography } from "@mui/material";
import { logout, signInWithGoogle, SingletonUserContext } from "../firebase/FirebaseApi";
import { useContext } from "react";
import { getChatrooms } from "../functions/zenCafeChatroomsApi";
import { useNavigate, useRoutes } from "react-router-dom";
const { v4: uuidv4 } = require('uuid');


const LoginSignupPage = () => {

    const singletonUserContext = useContext(SingletonUserContext);

    const navigate = useNavigate();

    // Here we will pick which button to show based on if user is logged in or not, if they are lagged out in show login button, else show logout button
    var buttonToShow = !singletonUserContext.user ? // basically if (singltonUserContext.user)
        <Button onClick={signInWithGoogle}>Login With Google</Button> : // use this button
        [<Button key={uuidv4()} onClick={logout}>Logout</Button>, <Button key={uuidv4()} onClick={() => { navigate("/ChatroomsPage") }}>Go to Chatroom List</Button>];   // else use this button

    console.log(getChatrooms());

    return (<>
        <Stack>
            <Typography>Login/Signup</Typography>
            {buttonToShow}
        </Stack>
    </>);
}

export default LoginSignupPage;