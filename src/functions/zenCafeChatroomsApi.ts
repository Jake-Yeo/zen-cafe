
import Chatroom from "../objects/Chatroom";
import ChatroomMetadata from "../objects/ChatroomMetadata";
import Message from "../objects/Message";
import { zenCafeApiUrl } from "./envVars";

function dataToChatroomMetadataObj(data: any): ChatroomMetadata {
    const { _id, chatroomName, creatorUsername, creatorUid } = data;

    const chatroomMetadataToReturn = new ChatroomMetadata(chatroomName, creatorUsername, creatorUid, _id);

    return chatroomMetadataToReturn;
}

function dataToChatroomObj(data: any): Chatroom {

    function dataToMessageObj(data: any): Message {
        const { _id, senderUsername, senderUid, message, chatroomId } = data;

        var { deleted } = data;

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
        const response = await fetch(`${zenCafeApiUrl}/chatrooms/sendMessage`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('currentZenUserJwtToken')}`
            },
            body: JSON.stringify({
                chatroom_id: chatroom_id,
                senderUsername: senderUsername,
                senderUid: senderUid,
                message: message,
                deleted: deleted,
            })
        });

        const { expired } = await response.json();

        if (expired) {
            throw Error("Token Expired");
        }

        if (!response.ok) {
            console.error('createChatroom Error:', 'Failed to fetch');
            throw Error("Fetch createChatroom Failed");
        }

    } catch (error) {
        console.error('sendMessage Error:', 'Failed to fetch');
        throw error;
    }
}

export async function isChatroomNameUnique(chatroomName: string): Promise<boolean | null> {
    try {
        const response = await fetch(`${zenCafeApiUrl}/chatrooms/isChatroomNameUnique`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('currentZenUserJwtToken')}`
            },
            body: JSON.stringify({
                chatroomName: chatroomName,
            })
        });

        const data = await response.json();

        const { expired } = data;

        if (expired) {
            throw Error("Token Expired");
        }

        if (!response.ok) {
            console.error('isChatroomNameUnique endpoint error:', 'Failed to fetch');
            throw Error("Fetch isChatroomNameUnique Failed");
        }

        const { isChatroomNameUnique } = data;

        return isChatroomNameUnique;

    } catch (error) {
        throw error;
    }
}

export async function createChatroom(chatroomName: string, creatorUsername: string, creatorUid: string): Promise<ChatroomMetadata> {
    try {
        const response = await fetch(`${zenCafeApiUrl}/chatrooms/createChatroom`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('currentZenUserJwtToken')}`
            },
            body: JSON.stringify({
                chatroomName: chatroomName,
                creatorUsername: creatorUsername,
                creatorUid: creatorUid,
            })
        });

        const data = await response.json();

        const { expired } = data;

        if (expired) {
            throw Error("Token Expired");
        }

        if (!response.ok) {
            console.error('createChatroom Error:', 'Failed to fetch');
            throw Error("Fetch createChatroom Failed");
        }

        const newChatroomMetadata = dataToChatroomMetadataObj(data);

        return newChatroomMetadata;

    } catch (error) {
        console.error('getChatrooms Error:', 'Failed to fetch');
        throw error;
    }
}

export async function deleteChatroom(chatroom_id: string): Promise<boolean> {
    try {
        const response = await fetch(`${zenCafeApiUrl}/chatrooms/deleteChatroom/${chatroom_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('currentZenUserJwtToken')}`
            },
        });

        const { expired } = await response.json();

        if (expired) {
            throw Error("Token Expired");
        }

        if (!response.ok) {
            console.error('deleteChatroom Error:', 'Failed to delete');
            throw Error("Fetch deleteChatroom Failed")
        }

        return true;
    } catch (error) {
        console.error('deleteChatroom Error:', 'Failed to delete');
        throw error;
    }
}

export async function doesChatroomExist(chatroom_id: string): Promise<boolean> {
    try {
        const response = await fetch(`${zenCafeApiUrl}/chatrooms/doesChatroomExist/${chatroom_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('currentZenUserJwtToken')}`
            },
        });

        const data = await response.json();

        const { expired } = data;

        if (expired) {
            console.log("in if statement");
            throw Error("Token Expired");
        }

        if (!response.ok) {
            console.error('doesChatroomExist Error:', 'Failed to get');
            throw Error("Fetch doesChatroomExist Failed");
        }

        const { doesChatroomExist } = data;

        return doesChatroomExist;
    } catch (error) {
        console.error('doesChatroomExist Error:', 'Failed to get');
        throw error;
    }
}

export async function getChatroom(chatroom_id: string): Promise<Chatroom> {
    try {
        const response = await fetch(`${zenCafeApiUrl}/chatrooms/getChatroom/${chatroom_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('currentZenUserJwtToken')}`
            },
        });

        const data = await response.json();

        const { expired } = data;

        if (expired) {
            throw Error("Token Expired");
        }

        if (!response.ok) {
            console.error('getChatroom Error:', 'Failed to fetch');
            throw Error("Fetch getChatroom Failed");
        }

        const newChatroom = dataToChatroomObj(data);

        return newChatroom;

    } catch (error) {
        console.error('getChatroom Error:', 'Failed to fetch');
        throw error;
    }
}

export async function getChatrooms(): Promise<ChatroomMetadata[]> {
    try {
        const response = await fetch(`${zenCafeApiUrl}/chatrooms/getChatrooms`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('currentZenUserJwtToken')}`
            },
        });

        const data = await response.json();

        const { expired } = data;

        if (expired) {
            throw Error("Token Expired");
        }

        if (!response.ok) {
            console.error('getChatrooms Error:', 'Failed to fetch');
            throw Error("Fetch getChatrooms Failed");
        }

        var chatrooms: ChatroomMetadata[] = [];

        for (const jsonChatroomMetadata of data) {
            chatrooms.push(dataToChatroomMetadataObj(jsonChatroomMetadata));
        }

        return chatrooms

    } catch (error) {
        console.error('getChatrooms Error:', 'Failed to fetch at ', `${zenCafeApiUrl}/chatrooms/getChatrooms`);
        throw error;
    }
}