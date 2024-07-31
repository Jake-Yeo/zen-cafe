import { useContext, useEffect, useState } from "react";
import Playlist from "../../../objects/Playlist";
import { getRadio } from "../../../functions/ZCByteVaultApi";
import Radio from "../../../objects/Radio";
import Song from "../../../objects/Song";
import { Stack, Typography } from "@mui/material";
import FrostedButton from "../FrostedButton";
import useRadio, { RadioContext } from "./RadioProvider";
import RadioFunctions from "./RadioProvider";

const RadioUi = () => {

    const radioContext = useContext(RadioContext);
    if (radioContext === undefined) {
        throw new Error('RadioUi must be used within a RadioProvider');
    }

    return (<>
        <Stack>
            <FrostedButton text="play/pause" onClick={radioContext.playPause} />
            <FrostedButton text="prev" onClick={radioContext.prev} />
            <FrostedButton text="next" onClick={radioContext.next} />
            <FrostedButton text="change radio" onClick={radioContext.changeRadio} />
            <Typography color="white" zIndex={1}>{radioContext.currPlaylist?.getName()}</Typography>
            <Typography color="white" zIndex={1}>{radioContext.currSong?.getTitle()}</Typography>
        </Stack>
    </>)
}

export default RadioUi