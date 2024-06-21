import { Typography } from "@mui/material"
import { SingletonUserContext } from "../firebase/FirebaseApi"
import { useContext } from "react";


const TestComponent = () => {

    const singletonUserContext = useContext(SingletonUserContext);

    return (<>
        <Typography>{singletonUserContext.user.getGoogleId()}</Typography>
        <Typography>{singletonUserContext.user.getUsername()}</Typography>
        <Typography>awefawefawefaew</Typography>
    </>)

}

export default TestComponent