import Chatroom from "../objects/Chatroom";
import ChatroomMetadata from "../objects/ChatroomMetadata";
import Message from "../objects/Message";

function dataToChatroomMetadataObj(data: any): ChatroomMetadata {
    const { _id, chatroomName, creatorUsername, creatorUid } = data;

    const chatroomMetadataToReturn = new ChatroomMetadata(chatroomName, creatorUsername, creatorUid, _id);

    return chatroomMetadataToReturn;
}


function dataToChatroomObj(data: any): Chatroom {

    function dataToMessageObj(data: any): Message {
        const { _id, senderUsername, senderUid, message } = data;

        const messageToReturn = new Message(message, senderUsername, senderUid, _id);

        return messageToReturn;
    }

    function messagesJsonDataToMessagesArray(messagesJson: any): Message[] {
        console.log(messagesJson);
        const msgArrToReturn: Message[] = []

        const dataArr = messagesJson as any[];

        for (const data of dataArr) {
            msgArrToReturn.push(dataToMessageObj(data));
        }
        return msgArrToReturn;
    }

    const { _id, chatroomName, creatorUsername, creatorUid, messages } = data;

    const newChatroomToReturn = new Chatroom(chatroomName, creatorUsername, creatorUid, messagesJsonDataToMessagesArray(messages), _id);

    return newChatroomToReturn;
}

export async function sendMessage(chatroom_id: string, senderUsername: string, senderUid: string, message: string): Promise<void> {
    try {
        console.log("before fetch");
        const response = await fetch(`http://localhost:3000/chatrooms/sendMessage`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chatroom_id: chatroom_id,
                senderUsername: senderUsername,
                senderUid: senderUid,
                message: message,
            })
        });
        console.log("awefawefaw");
        
        if (!response.ok) {
            console.error('createChatroom Error:', 'Failed to fetch');
        }

    } catch (error) {
        console.error('sendMessage Error:', 'Failed to fetch');
    }
}

export async function createChatroom(chatroomName: string, creatorUsername: string, creatorUid: string): Promise<ChatroomMetadata | null> {
    try {
        const response = await fetch(`http://localhost:3000/chatrooms/createChatroom`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chatroomName: chatroomName,
                creatorUsername: creatorUsername,
                creatorUid: creatorUid,
            })
        });

        if (!response.ok) {
            console.error('createChatroom Error:', 'Failed to fetch');
            return null;
        }

        const data = await response.json();

        const newChatroomMetadata = dataToChatroomMetadataObj(data);

        return newChatroomMetadata;

    } catch (error) {
        console.error('getChatrooms Error:', 'Failed to fetch');
        return null;
    }
}

export async function getChatroom(chatroom_id: string): Promise<Chatroom | null> {
    try {
        const response = await fetch(`http://localhost:3000/chatrooms/getChatroom/${chatroom_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('getChatroom Error:', 'Failed to fetch');
            return null;
        }

        const data = await response.json();

        const newChatroom = dataToChatroomObj(data);

        return newChatroom;

    } catch (error) {
        console.error('getChatroom Error:', 'Failed to fetch');
        return null;
    }
}

export async function getChatrooms(): Promise<ChatroomMetadata[] | null> {
    try {
        const response = await fetch(`http://localhost:3000/chatrooms/getChatrooms`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('getChatrooms Error:', 'Failed to fetch');
            return null;
        }

        const data = await response.json();

        var chatrooms: ChatroomMetadata[] = [];

        for (const jsonChatroomMetadata of data) {
            chatrooms.push(dataToChatroomMetadataObj(jsonChatroomMetadata));
        }

        return chatrooms

    } catch (error) {
        console.error('getChatrooms Error:', 'Failed to fetch');
        return null;
    }
}