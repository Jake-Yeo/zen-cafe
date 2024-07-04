class Message {

    private messageId: string;
    private message: string;
    private senderUsername: string;
    private senderUid: string;

    constructor(message: string, senderUsername: string, senderUid: string, messageId: string) {
        this.message = message;
        this.senderUid = senderUid;
        this.senderUsername = senderUsername;
        this.messageId = messageId;
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
}

export default Message;