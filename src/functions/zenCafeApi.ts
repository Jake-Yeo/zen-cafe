

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

export async function doesUserExist(google_id: string): Promise<boolean> {
    try {
        const response = await fetch(`http://localhost:3000/users/doesUserExist/${google_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('Error:', 'Failed to fetch');
            return false;
        }

        const data = await response.json();

        const { doesUserExist } = await data;

        return doesUserExist;

    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}