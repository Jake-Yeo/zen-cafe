import { useEffect, useState } from "react";
import Playlist from "../../objects/Playlist";
import { getPlaylists } from "../../functions/ZCByteVaultApi";


const Radio = () => {

    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        const getAndSetPlaylists = async () => {
            const playlists = await getPlaylists();
            if (playlists) {
                setPlaylists(playlists);
            }
        }
        getAndSetPlaylists();
    }, [])

    return (<></>)
}

export default Radio