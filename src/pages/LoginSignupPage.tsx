import { Button, Stack, Typography } from "@mui/material";
import { logout, signInWithGoogle, SingletonUserContext } from "../firebase/FirebaseApi";
import { useContext } from "react";
import { getChatrooms } from "../functions/zenCafeChatroomsApi";


const LoginSignupPage = () => {

    const singletonUserContext = useContext(SingletonUserContext);

    // Here we will pick which button to show based on if user is logged in or not, if they are lagged out in show login button, else show logout button
    var buttonToShow = !singletonUserContext.user ? // basically if (singltonUserContext.user)
        <Button onClick={signInWithGoogle}>Login With Google</Button> : // use this button
        <Button onClick={logout}>Logout</Button>;   // else use this button

    console.log(getChatrooms());

    return (<>
        <Stack>
            <Typography>Login/Signup</Typography>
            {buttonToShow}
        </Stack>
    </>);
}

export default LoginSignupPage;