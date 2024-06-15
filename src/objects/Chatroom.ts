import Message from "./Message";


class Chatroom {
    private ownerUsername: string;
    private ownerUid: string;
    private messages: Message[];
    private chatroomName: string;

    constructor(chatroomName: string, ownerUsername: string, ownerUid: string, messages = []) {
        this.chatroomName = chatroomName;
        this.ownerUsername = ownerUsername;
        this.ownerUid = ownerUid;
        this.messages = messages;
    }

    public getOwnerUsername(): string {
        return this.ownerUsername;
    }

    public getOwnerUid(): string {
        return this.ownerUid;
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