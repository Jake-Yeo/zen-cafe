

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