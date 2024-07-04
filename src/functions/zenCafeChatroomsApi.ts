import ChatroomMetadata from "../objects/ChatroomMetadata";


export function sendMessage(chatroom_id: string, senderUsername: string, senderUid: string, message: string): void {
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

export async function getChatrooms(): Promise<ChatroomMetadata[] | null> {
    try {
        const response = await fetch(`http://localhost:3000/chatrooms/getChatrooms`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        var chatrooms: ChatroomMetadata[] = [];

        for (const jsonChatroomMetadata of data) {
            const {_id, chatroomName, creatorUsername, creatorUid} = jsonChatroomMetadata;
            chatrooms.push(new ChatroomMetadata(chatroomName, creatorUsername, creatorUid, _id));
        }

        return chatrooms

    } catch (error) {
        console.error('getChatrooms Error:', 'Failed to fetch');
        return null;
    }
}