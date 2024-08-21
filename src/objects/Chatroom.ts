import Message from "./Message";

class Chatroom {
    private creatorUsername: string;
    private creatorUid: string;
    private messages: Message[];
    private deletedMessageIds: string[];
    private chatroomName: string;
    private chatroomId: string;

    constructor(chatroomName: string, creatorUsername: string, creatorUid: string, messages: Message[] = [], chatroomId: string) {
        this.chatroomName = chatroomName;
        this.creatorUsername = creatorUsername;
        this.creatorUid = creatorUid;
        this.chatroomId = chatroomId;
        this.messages = [];
        this.deletedMessageIds = [];

        for (const msg of messages) {
            if (msg.isDeleted()) {
                this.deletedMessageIds.push(msg.getMessage());
                this.deleteMessages();
            } else {
                this.messages.push(msg);
            }
        }
        console.log(this.deletedMessageIds);
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

    public getMessages(): Message[] {
        return this.messages;
    }

    public getChatroomName(): string {
        return this.chatroomName;
    }

    private deleteMessages(): void {
        for (const msg of this.messages) {
            if (this.deletedMessageIds.includes(msg.getMessageId())) {
                const indexOfMsgToDelete = this.messages.indexOf(msg);
                this.messages.splice(indexOfMsgToDelete, 1);
            }
        }
    }

    public pushMessage(message: Message): void {
        if (message.isDeleted()) {
            this.deletedMessageIds.push(message.getMessage());
            this.deleteMessages();
        } else {
            this.messages.push(message);
        }
    }
}

export default Chatroom;