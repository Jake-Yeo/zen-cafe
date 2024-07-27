import Song from "./Song";

class Playlist {

    private name: string;
    private songs: Song[];
    private id: string;

    constructor(name: string, songs: Song[], id: string) {
        this.name = name;
        this.songs = songs
        this.id = id;
    }

    public getSongs(): Song[] {
        return this.songs;
    }

    public getName(): string {
        return this.name;
    }

    public getId(): string {
        return this.id;
    }

}

export default Playlist