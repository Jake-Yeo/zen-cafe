class Song {
    private author: string;
    private streamLink: string;
    private title: string;
    private source: string;

    constructor(author: string, streamLink: string, title: string, source: string) {
        this.author = author;
        this.streamLink = streamLink;
        this.title = title;
        this.source = source;
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

    public getSource(): string {
        return this.source;
    }
}

export default Song