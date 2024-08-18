import { Box, Button, Stack, Typography } from "@mui/material";
import { logout, signInWithGoogle, SingletonUserContext } from "../firebase/FirebaseApi";
import { useContext, useEffect } from "react";
import { getChatrooms } from "../functions/zenCafeChatroomsApi";
import { useNavigate, useRoutes } from "react-router-dom";
import Background from "../components/sharedComponents/Background";
import ZenCafeLogo from "../components/sharedComponents/ZenCafeLogo";
import FrostedButton from "../components/sharedComponents/FrostedButton";
import Playlist from "../objects/Playlist";
import { getRadio } from "../functions/ZCByteVaultApi";
import Radio from "../objects/Radio";
import RadioPlayer from "../components/sharedComponents/Radio/RadioUi";
import RadioUi from "../components/sharedComponents/Radio/RadioUi";
import Header from "../components/sharedComponents/Header";
const { v4: uuidv4 } = require('uuid');


const LoginSignupPage = () => {


    // useEffect(() => {
    //     const playAudio = async () => {

    //         const radio: Radio | null = await getRadio();

    //         if (!radio) {
    //             console.log("playlist is null");
    //             return;
    //         }

    //         const randomPlaylist = radio.getPlaylists()[Math.floor(radio.getPlaylists().length * Math.random())];

    //         const randomSong = randomPlaylist.getSongs()[Math.floor(randomPlaylist.getSongs().length * Math.random())];

    //         console.log(randomSong.getStreamLink());

    //         let audio = await new Audio(randomSong.getStreamLink());

    //         document.body.appendChild(audio);

    //         document.body.addEventListener("click", function () {
    //             audio.play()
    //         })
    //     }
    //     playAudio();
    // }, [])

    const singletonUserContext = useContext(SingletonUserContext);

    const navigate = useNavigate();

    // Here we will pick which button to show based on if user is logged in or not, if they are logged out in show login button, else show logout button
    var buttonToShow = !singletonUserContext.user ? // basically if (singltonUserContext.user)
        <FrostedButton text={"Login With Google"} onClick={signInWithGoogle} marginBottom="20px" marginTop="20px" /> :
        [<FrostedButton key={uuidv4()} text={"logout"} onClick={logout} marginBottom="20px" marginTop="20px" />, <FrostedButton key={uuidv4()} text={"Go to Chatroom List"} onClick={() => { navigate("/ChatroomsPage") }} />];   // else use this button
    console.log(getChatrooms());

    return (<>
        <Background useVignette={true} useBlur={true}>
            <Stack spacing={4} alignItems={"center"} height={"100%"}>
                <Box height={"10px"}/>
                <ZenCafeLogo vh={35} />
                {buttonToShow}
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, padding: "10px"}}>
                    <RadioUi></RadioUi>
                </Box>
            </Stack>
        </Background >
    </>);
}

export default LoginSignupPage;