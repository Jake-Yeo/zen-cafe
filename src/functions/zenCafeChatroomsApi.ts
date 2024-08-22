import Chatroom from "../objects/Chatroom";
import ChatroomMetadata from "../objects/ChatroomMetadata";
import Message from "../objects/Message";
import apiUrl from "./apiUrl";

function dataToChatroomMetadataObj(data: any): ChatroomMetadata {
    const { _id, chatroomName, creatorUsername, creatorUid } = data;

    const chatroomMetadataToReturn = new ChatroomMetadata(chatroomName, creatorUsername, creatorUid, _id);

    return chatroomMetadataToReturn;
}


function dataToChatroomObj(data: any): Chatroom {

    function dataToMessageObj(data: any): Message {
        const { _id, senderUsername, senderUid, message, chatroomId} = data;

        var {deleted} = data;

        if (!deleted) {
            deleted = false;
        }

        const messageToReturn = new Message(message, senderUsername, senderUid, _id, deleted, chatroomId);

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

// Make sure to look at the network debugging tool to see that requests are actually being send to ensure its not a backend or frontend problem...
// Also for some reason edge is not letting me send my requests??? Maybe it might be because of the keep alive line? Idk...
// https://stackoverflow.com/questions/25847083/chrome-just-doesnt-finish-loading-js-files
export async function sendMessage(chatroom_id: string, senderUsername: string, senderUid: string, message: string, deleted: boolean): Promise<void> {
    try {
        console.log("before fetch");
        const response = await fetch(`${apiUrl}/chatrooms/sendMessage`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatroom_id: chatroom_id,
                senderUsername: senderUsername,
                senderUid: senderUid,
                message: message,
                deleted: deleted,
            })
        });

        if (!response.ok) {
            console.error('createChatroom Error:', 'Failed to fetch');
        }

    } catch (error) {
        console.error('sendMessage Error:', 'Failed to fetch');
    }
}

export async function isChatroomNameUnique(chatroomName: string): Promise<boolean | null> {
    try {
        const response = await fetch(`${apiUrl}/chatrooms/isChatroomNameUnique`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chatroomName: chatroomName,
            })
        });

        if (!response.ok) {
            console.error('isChatroomNameUnique endpoint error:', 'Failed to fetch');
            return null;
        }

        const data = await response.json();

        const { isChatroomNameUnique } = data;

        return isChatroomNameUnique;

    } catch (error) {
        return null;
    }
}

export async function createChatroom(chatroomName: string, creatorUsername: string, creatorUid: string): Promise<ChatroomMetadata | null> {
    try {
        const response = await fetch(`${apiUrl}/chatrooms/createChatroom`, {
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
        const response = await fetch(`${apiUrl}/chatrooms/getChatroom/${chatroom_id}`, {
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
        const response = await fetch(`${apiUrl}/chatrooms/getChatrooms`, {
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
        console.error('getChatrooms Error:', 'Failed to fetch at ', `${apiUrl}/chatrooms/getChatrooms`);
        return null;
    }
}