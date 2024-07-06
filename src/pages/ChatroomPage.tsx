import { useParams } from "react-router-dom";
import Chatroom from "../objects/Chatroom";
import { useEffect, useState } from "react";
import { getChatroom } from "../functions/zenCafeChatroomsApi";

const ChatroomPage = () => {

    const { chatroomId } = useParams();

    const [chatroom, setChatroom] = useState(new Chatroom("", "", "", [], ""));

    useEffect(() => {
        const fetchData = async () => {

            if (!chatroomId) {
                console.error('ChatroomPage Error:', 'Please provide a chatroomId url param');
                return;
            }

            const chatroom = await getChatroom(chatroomId);

            if (!chatroom) {
                console.error('ChatroomPage Error:', 'Failed to get chatroom.');
                return;
            }

            setChatroom(chatroom);
        }

        fetchData();
    }, [])

    return (<>
        {chatroom.getChatroomName()}
    </>)
}

export default ChatroomPage