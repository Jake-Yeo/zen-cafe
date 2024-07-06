import Message from "./Message";

class Chatroom {
    private creatorUsername: string;
    private creatorUid: string;
    private messages: Message[];
    private chatroomName: string;
    private chatroomId: string;

    constructor(chatroomName: string, creatorUsername: string, creatorUid: string, messages: Message[] = [], chatroomId: string) {
        this.chatroomName = chatroomName;
        this.creatorUsername = creatorUsername;
        this.creatorUid = creatorUid;
        this.messages = messages;
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

    public getMessages(): Message[] {
        return this.messages;
    }

    public getChatroomName(): string {
        return this.chatroomName;
    }

    public pushMessage(message: Message): void {
        this.messages.push(message);
    }
}

export default Chatroom;