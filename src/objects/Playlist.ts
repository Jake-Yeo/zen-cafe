import Song from "./Song";

class Playlist {

    private name: string;
    private songs: Song[];

    constructor(name: string, songs: Song[]) {
        this.name = name;
        this.songs = songs;
    }

    public getSongs(): Song[] {
        return this.songs;
    }

    public getName(): string {
        return this.name;
    }

}

export default Playlist