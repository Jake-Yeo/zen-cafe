import { useParams } from "react-router-dom";

const ChatroomPage = () => {

    const { chatroomId } = useParams();

    return (<>
        {chatroomId}
    </>)
}

export default ChatroomPage