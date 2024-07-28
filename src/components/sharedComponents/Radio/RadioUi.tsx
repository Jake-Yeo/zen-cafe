import { useContext, useEffect, useState } from "react";
import Playlist from "../../../objects/Playlist";
import { getRadio } from "../../../functions/ZCByteVaultApi";
import Radio from "../../../objects/Radio";
import Song from "../../../objects/Song";
import { Stack } from "@mui/material";
import FrostedButton from "../FrostedButton";
import useRadio, { RadioContext } from "./RadioProvider";
import RadioFunctions from "./RadioProvider";

const RadioUi = () => {

    const radioContext = useContext(RadioContext);
    if (radioContext === undefined) {
        throw new Error('useRadio must be used within a RadioProvider');
    }

    return (<>
        <Stack>
            <FrostedButton text="play/pause" onClick={radioContext.playPause} />
            <FrostedButton text="prev" />
            <FrostedButton text="next" />
            <FrostedButton text="shuffle" />
            <FrostedButton text="change radio" />
        </Stack>
    </>)
}

export default RadioUi