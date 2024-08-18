import { Box, Stack } from "@mui/material";
import ZenCafeLogo from "./ZenCafeLogo";
import FrostedButton from "./FrostedButton";
import { useNavigate } from "react-router-dom";

interface props {
    hideLogo?: boolean,
    hideBackButton?: boolean
}

const Header = ({ hideLogo = false, hideBackButton = false }: props) => {

    const navigate = useNavigate();

    const margin = "15px";

    return (<>
        <Stack direction={"row"} zIndex={1} width={"100%"} justifyContent={"space-between"}>
            {
                hideLogo ?
                    <Box sx={{ opacity: 0 }} marginLeft={margin} marginRight={margin} marginTop={margin} >
                        <ZenCafeLogo vh={10} logoType={1}></ZenCafeLogo>
                    </Box> :
                    <Box marginLeft={margin} marginRight={margin} marginTop={margin} >
                        <ZenCafeLogo vh={10} logoType={1}></ZenCafeLogo>
                    </Box>
            }
            {
                hideBackButton ?
                    <></>
                    :
                    <FrostedButton
                        onClick={() => { navigate(-1) }}
                        marginLeft={margin} marginRight={margin} marginTop={margin} content={`url("/svgs/back.svg")`} minWidth="0px" width={"60px"} height="60px" text={""}></FrostedButton>
            }
        </Stack>
    </>)
}

export default Header;