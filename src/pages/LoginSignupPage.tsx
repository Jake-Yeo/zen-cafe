import { Button, Stack, Typography } from "@mui/material";
import { logout, signInWithGoogle, SingletonUserContext } from "../firebase/FirebaseApi";
import { useContext } from "react";


const LoginSignupPage = () => {

    const singletonUserContext = useContext(SingletonUserContext);

    var buttonToShow = <Button onClick={signInWithGoogle}>Login With Google</Button>;

    if (singletonUserContext.user) {
        buttonToShow = <Button onClick={logout}>Logout</Button>;
    }

    return (<>
        <Stack>
            <Typography>Login/Signup</Typography>
            {buttonToShow}
        </Stack>
    </>);
}

export default LoginSignupPage;