import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import Radio from "../../../objects/Radio";
import { getRadio } from "../../../functions/ZCByteVaultApi";
import Song from "../../../objects/Song";
import Playlist from "../../../objects/Playlist";

interface props {
    children: ReactNode,
}

interface RadioContextType {
    playPause: () => void;
    next: () => void;
    prev: () => void;
    shuffle: () => void;
    changeRadio: () => void;
    isPlaying: () => boolean;
}

export const RadioContext = createContext<RadioContextType | undefined>(undefined);

const RadioProvider = ({ children }: props) => { // This provides global radio that can be used by all components and will alter the same radio.

    const [radio, setRadio] = useState<Radio>();
    const audioRef = useRef(new Audio()); // The useRef hook will always return the same ref object when a functional component re-renders (we want the radio to stay the same across pages)
    const radioState = useRef({
        currentPlaylist: null as unknown as Playlist,
        currentSong: null as unknown as Song,
        playingSong: false
    });

    useEffect(() => {
        const getAndSetRadio = async () => {
            const radio: Radio | null = await getRadio();

            if (!radio) {
                console.log("playlist is null");
                return;
            }

            const randomPlaylist = radio.getPlaylists()[Math.floor(radio.getPlaylists().length * Math.random())];

            const randomSong = randomPlaylist.getSongs()[Math.floor(randomPlaylist.getSongs().length * Math.random())];

            radioState.current.currentPlaylist = randomPlaylist;
            radioState.current.currentSong = randomSong;

            audioRef.current.src = radioState.current.currentSong.getStreamLink();
            document.body.appendChild(audioRef.current);

            if (radio) {
                setRadio(radio);
            }
        }

        getAndSetRadio();
    }, [])

    const isPlaying = () => {
        return radioState.current.playingSong
    }

    const playPause = () => {
        if (!radioState.current.playingSong) {
            audioRef.current.play();
            radioState.current.playingSong = true
        } else {
            audioRef.current.pause();
            radioState.current.playingSong = false;
        }
    };

    const next = () => {
        // Add logic to play the next song
    };

    const prev = () => {
        // Add logic to play the previous song
    };

    const shuffle = () => {
        // Add logic to shuffle the playlist
    };

    const changeRadio = () => {
        // Add logic to change the radio station
    };

    return (
        <RadioContext.Provider value={{ playPause, next, prev, shuffle, changeRadio, isPlaying }}>
            {children}
        </RadioContext.Provider>
    );

}

export default RadioProvider