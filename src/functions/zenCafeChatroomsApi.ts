import ChatroomMetadata from "../objects/ChatroomMetadata";

function dataToChatroomMetadataObj(data: any): ChatroomMetadata {
    const { _id, chatroomName, creatorUsername, creatorUid } = data;

    const newChatroomMetadata = new ChatroomMetadata(chatroomName, creatorUsername, creatorUid, _id);

    return newChatroomMetadata;
}

export function sendMessage(chatroom_id: string, senderUsername: string, senderUid: string, message: string): void { // remake this function
    fetch('http://localhost:3000/chatrooms/sendMessage', {
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
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
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