import { Box, Button, Stack, Typography } from "@mui/material";
import { logout, signInWithGoogle, SingletonUserContext } from "../firebase/FirebaseApi";
import { ReactElement, SetStateAction, useContext, useEffect, useState } from "react";
import { getChatrooms } from "../functions/zenCafeChatroomsApi";
import { useNavigate, useParams } from "react-router-dom";
import Background from "../components/sharedComponents/Background";
import ZenCafeLogo from "../components/sharedComponents/ZenCafeLogo";
import FrostedButton from "../components/sharedComponents/FrostedButton";
import RadioUi from "../components/sharedComponents/Radio/RadioUi";
import Header from "../components/sharedComponents/Header";
import CustomSnackbar from "../components/sharedComponents/CustomSnackbar";
import { doesUserExist, isTokenValid } from "../functions/zenCafeUsersApi";
const { v4: uuidv4 } = require('uuid');


const LoginSignupPage = () => {

    const { expired } = useParams();
    const [openExpiredSnack, setOpenExpiredSnack] = useState(false);

    const [buttonToShow, setButtonToShow] = useState<ReactElement>(<></>);

    const singletonUserContext = useContext(SingletonUserContext);

    const loggedInDisplay = <>[<FrostedButton key={uuidv4()} text={"logout"} onClick={logout} marginBottom="20px" marginTop="20px" />, <FrostedButton key={uuidv4()} text={"Go to Chatroom List"} onClick={() => { navigate("/ChatroomsPage") }} />]</>;
    const loggedOutDisplay = <FrostedButton text={"Login With Google"} onClick={signInWithGoogle} marginBottom="20px" marginTop="20px" />;


    useEffect(() => {
        const helper = async () => {
            try {
                console.log("does User exist test");
                await isTokenValid();
            } catch (error) {
                if (error instanceof Error && error.message === 'Token Expired') {
                    setOpenExpiredSnack(true);
                    logout();
                    setButtonToShow(loggedOutDisplay);
                }
            }
        }
        helper();
    }, [])

    const navigate = useNavigate();

    useEffect(() => {
        if (!singletonUserContext.user) {
            setButtonToShow(loggedOutDisplay);
        } else {
            setButtonToShow(loggedInDisplay);
        }
    }, [singletonUserContext.user])


    return (<>
        <Background useVignette={true} useBlur={true}>
            <CustomSnackbar open={openExpiredSnack} setOpen={setOpenExpiredSnack} message={"Session token expired, please login again!"}></CustomSnackbar>
            <Stack spacing={4} alignItems={"center"} height={"100%"}>
                <Box height={"10px"} />
                <ZenCafeLogo vh={35} />
                {buttonToShow}
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, padding: "10px" }}>
                    <RadioUi></RadioUi>
                </Box>
            </Stack>
        </Background >
    </>);
}

export default LoginSignupPage;