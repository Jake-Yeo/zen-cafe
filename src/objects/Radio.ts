import Playlist from "./Playlist"
import Song from "./Song";

class Radio {
    private playlists: Playlist[]

    constructor(playlists: Playlist[]) {
        this.playlists = playlists;
    }

    public getPlaylists(): Playlist[] {
        return this.playlists;
    }
}

export default Radio