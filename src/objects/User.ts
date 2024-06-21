class User {
    private legalName: string;
    private googleId: string;
    private username: string;

    constructor (legalName: string, googleId: string, username: string) {
        this.legalName = legalName;
        this.googleId = googleId;
        this.username = username;
    }

    public getLegalName(): string {
        return this.legalName;
    }

    public getGoogleId(): string {
        return this.googleId;
    }

    public getUsername(): string {
        return this.username;
    }

    public setLegalName(legalName: string): void {
        this.legalName = legalName;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public setUser(user: User): void {
        this.legalName = user.getLegalName();
        this.username = user.getUsername();
        this.googleId = user.getGoogleId();
    }
}

export default User;