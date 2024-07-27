class Song {
    private author: string;
    private streamLink: string;
    private title: string;
    private id: string;

    constructor(author: string, streamLink: string, title: string, id: string) {
        this.author = author;
        this.streamLink = streamLink;
        this.title = title;
        this.id = id;
    }

    public getAuthor(): string {
        return this.author;
    }

    public getStreamLink(): string {
        return this.streamLink;
    }

    public getTitle(): string {
        return this.title;
    }

    public getId(): string {
        return this.id;
    }
}

export default Song