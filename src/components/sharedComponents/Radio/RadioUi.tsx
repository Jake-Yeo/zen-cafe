import { useContext, useEffect, useState } from "react";
import Playlist from "../../../objects/Playlist";
import { getRadio } from "../../../functions/ZCByteVaultApi";
import Radio from "../../../objects/Radio";
import Song from "../../../objects/Song";
import { Link, Stack, Typography } from "@mui/material";
import FrostedButton from "../FrostedButton";
import useRadio, { RadioContext } from "./RadioProvider";
import RadioFunctions from "./RadioProvider";

const RadioUi = () => {

    const radioContext = useContext(RadioContext);
    if (radioContext === undefined) {
        throw new Error('RadioUi must be used within a RadioProvider');
    }

    const [playPauseSvg, setPlayPauseSvg] = useState(`url("/svgs/RadioSvgs/play.svg")`);
    const onChangeForPlayPause = () => {
        radioContext.playPause();
        if (radioContext.isPlaying()) {
            setPlayPauseSvg(`url("/svgs/RadioSvgs/pause.svg")`);
        } else {
            setPlayPauseSvg(`url("/svgs/RadioSvgs/play.svg")`);
        }
    }

    // This use effect sets the proper icon for the RadioUi when the user switches pages
    useEffect(() => {
        if (radioContext.isPlaying()) {
            setPlayPauseSvg(`url("/svgs/RadioSvgs/pause.svg")`);
        } else {
            setPlayPauseSvg(`url("/svgs/RadioSvgs/play.svg")`);
        }
    }, [])

    return (<>
        <Stack spacing={0.1}>
            <Stack
                direction="row"
                spacing={1}
                style={{ alignItems: 'center' }} // Ensure buttons are centered
            >
                {/** Must also set minwidth for each button!!! */}
                <FrostedButton height={"35px"} width={"auto"} minWidth={"35px"} text="" content={playPauseSvg} onClick={onChangeForPlayPause} />
                <FrostedButton height={"35px"} width={"auto"} minWidth={"35px"} text="" content={`url("/svgs/RadioSvgs/radio.svg")`} onClick={radioContext.changeRadio} />
                <FrostedButton height={"35px"} width={"auto"} minWidth={"35px"} text="" content={`url("/svgs/RadioSvgs/prev.svg")`} onClick={() => {
                    radioContext.prev();
                    setPlayPauseSvg(`url("/svgs/RadioSvgs/pause.svg")`);
                }} rotate={'rotate(180deg)'} />
                <FrostedButton height={"35px"} width={"auto"} minWidth={"35px"} text="" content={`url("/svgs/RadioSvgs/next.svg")`} onClick={() => {
                    radioContext.next();
                    setPlayPauseSvg(`url("/svgs/RadioSvgs/pause.svg")`);
                }} />
            </Stack>
            <Stack direction="row"></Stack>
            <Typography color="white" zIndex={1}>Radio: {radioContext.currPlaylist?.getName()}</Typography>
            <Typography color="white" zIndex={1}></Typography>
            <Link sx={{
                zIndex: 1,
                color: 'white', // Set text color to white
                textDecorationColor: 'rgba(255, 255, 255, 0.5)',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    height: '2px', // Thickness of the underline
                    backgroundColor: 'white', // Underline color
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease'
                },
                '&:hover::after': {
                    transform: 'scaleX(1)' // Full underline on hover
                }
            }} href={"https://www.youtube.com/watch?v=" + radioContext.currSong?.getId()}
                underline="always"
                target="_blank"
                rel="noopener noreferrer" // they said to add this for security
            >
                Song: {radioContext.currSong?.getTitle()}
            </Link>
        </Stack>
    </>)
}

export default RadioUi