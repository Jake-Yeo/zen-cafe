class Message {

    private messageId: string;
    private message: string;
    private senderUsername: string;
    private senderUid: string;
    private deleted: boolean;
    private chatroomId: string;

    constructor(message: string, senderUsername: string, senderUid: string, messageId: string, deleted: boolean, chatroomId: string) {
        this.message = message;
        this.senderUid = senderUid;
        this.senderUsername = senderUsername;
        this.messageId = messageId;
        this.deleted = deleted;
        this.chatroomId = chatroomId;
    }

    public getMessageId(): string {
        return this.messageId;
    }

    public getMessage(): string {
        return this.message;
    }

    public getSenderUsername(): string {
        return this.senderUsername;
    }

    public getSenderUid(): string {
        return this.senderUid;
    }

    public isDeleted(): boolean {
        return this.deleted;
    }

    public getChatroomId(): string {
        return this.chatroomId;
    }
}

export default Message;