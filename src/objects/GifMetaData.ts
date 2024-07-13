class GifMetaData {
    private gifName: string;
    private gifPath: string;
    private gifSource: string;
    private gifAuthor: string;

    constructor(gifPath: string, gifSource: string, gifAuthor: string, gifName: string) {
        this.gifPath = gifPath;
        this.gifSource = gifSource;
        this.gifAuthor = gifAuthor;
        this.gifName = gifName;
    }

    public getGifPath(): string {
        return this.gifPath;
    }

    public getGifSource(): string {
        return this.gifSource;
    }

    public getGifAuthor(): string {
        return this.gifAuthor;
    }

    public getGifName(): string {
        return this.gifName;
    }
}

export default GifMetaData