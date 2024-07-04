class ChatroomMetadata {

    private creatorUsername: string;
    private creatorUid: string;
    private chatroomName: string;
    private chatroomId: string;

    constructor(chatroomName: string, creatorUsername: string, creatorUid: string, chatroomId: string) {
        this.chatroomName = chatroomName;
        this.creatorUsername = creatorUsername;
        this.creatorUid = creatorUid;
        this.chatroomId = chatroomId;
    }

    public getChatroomId(): string {
        return this.chatroomId;
    }

    public getCreatorUsername(): string {
        return this.creatorUsername;
    }

    public getCreatorUid(): string {
        return this.creatorUid;
    }

    public getChatroomName(): string {
        return this.chatroomName;
    }
}

export default ChatroomMetadata
