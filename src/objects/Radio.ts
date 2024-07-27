import Playlist from "./Playlist"

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