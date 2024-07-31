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
    changeRadio: () => void;
    isPlaying: () => boolean;
    currSong: Song | undefined;
    currPlaylist: Playlist | undefined;
}

export const RadioContext = createContext<RadioContextType | undefined>(undefined);

const playlistSongHistory: { currentPlaylist: Playlist, currentSong: Song }[] = []

const RadioProvider = ({ children }: props) => { // This provides global radio that can be used by all components and will alter the same radio.

    const [radio, setRadio] = useState<Radio>();
    const audioRef = useRef(new Audio()); // The useRef hook will always return the same ref object when a functional component re-renders (we want the radio to stay the same across pages)
    
    const [currSong, setCurrSong] = useState<Song>();
    const [currPlaylist, setCurrPlaylist] = useState<Playlist>();
    
    const radioState = useRef({
        currentPlaylist: null as unknown as Playlist,
        currentSong: null as unknown as Song,
        playingSong: false,
        currIndex: -1
    });

    const setUpSong = () => {

        const addSongToHistory = () => {
            playlistSongHistory.push({
                currentPlaylist: radioState.current.currentPlaylist,
                currentSong: radioState.current.currentSong,
            });
            radioState.current.currIndex++;
        }

        const currPlaylist: Playlist = radioState.current.currentPlaylist;
        const nextSong = currPlaylist.getSongs()[Math.floor(currPlaylist.getSongs().length * Math.random())];

        radioState.current.currentPlaylist = currPlaylist;
        radioState.current.currentSong = nextSong;

        audioRef.current.src = radioState.current.currentSong.getStreamLink();
        console.log(audioRef.current.src);

        updateCurrPlaylistSong();

        addSongToHistory();
    }

    useEffect(() => {
        const getAndSetRadio = async () => {
            const radio: Radio | null = await getRadio();

            if (!radio) {
                console.log("playlist is null");
                return;
            }

            if (radio) {
                setRadio(radio);
            }

            audioRef.current.addEventListener('ended', () => {
                next();
            }) // for when the song ends

            document.body.appendChild(audioRef.current);
        }

        getAndSetRadio();
        console.log("setup");
    }, [])

    useEffect(() => {
        changeRadio(); // basically initalizes the radio when it actually gets the correct data for the playlists and songs
    }, [radio])

    const isPlaying = () => {
        return radioState.current.playingSong
    }

    const updateCurrPlaylistSong = () => {
        setCurrPlaylist(radioState.current.currentPlaylist);
        setCurrSong(radioState.current.currentSong);
    }

    const play = () => {
        audioRef.current.play().catch(()=>{console.log("Play asynchronous error (doesen't rlly affect anything tbh)")});
        radioState.current.playingSong = true;
        updateCurrPlaylistSong();
        console.log("HistoryLength: ", playlistSongHistory.length, "Pointer", radioState.current.currIndex)
        console.log(playlistSongHistory.at(radioState.current.currIndex));
    }

    const pause = () => {
        audioRef.current.pause();
        radioState.current.playingSong = false;
    }

    const playPause = () => {
        if (isPlaying()) {
            pause();
        } else {
            play();
        }
    }

    const setUpSongAtCurrIndex = () => {
        const stateAtCurrIndex = playlistSongHistory.at(radioState.current.currIndex);

        if (stateAtCurrIndex) {
            radioState.current.currentPlaylist = stateAtCurrIndex?.currentPlaylist;
            radioState.current.currentSong = stateAtCurrIndex?.currentSong;
        }

        audioRef.current.src = radioState.current.currentSong.getStreamLink();
    }

    const next = () => {
        pause();

        if (playlistSongHistory.length == radioState.current.currIndex + 1) {
            setUpSong();
        } else {
            radioState.current.currIndex++;
            setUpSongAtCurrIndex();
        }

        play();
    };

    const prev = () => {
        pause();
        if (radioState.current.currIndex != 0) {
            radioState.current.currIndex--;
            setUpSongAtCurrIndex();
        }
        play();
    };

    const resetSongHistory = () => {
        radioState.current.currIndex = -1;
        playlistSongHistory.splice(0, playlistSongHistory.length);
    }


    // Reset SongHistory everytime the playlist changes (because we want to play songs from the same radio)
    const changeRadio = () => {
        resetSongHistory();
        audioRef.current.pause();
        const randomPlaylist = radio?.getPlaylists()[Math.floor(radio.getPlaylists().length * Math.random())];
        console.log(randomPlaylist);
        if (randomPlaylist) {
            radioState.current.currentPlaylist = randomPlaylist;
            setUpSong();
        }
        if (isPlaying()) {
            play();
        }

    };

    return (
        <RadioContext.Provider value={{ playPause, next, prev, changeRadio, isPlaying, currPlaylist, currSong}}>
            {children}
        </RadioContext.Provider>
    );

}

export default RadioProvider