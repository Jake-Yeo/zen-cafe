import { Box } from "@mui/material";
import ZenCafeLogo from "./ZenCafeLogo";

const Header = () => {
    return (<>
        <Box zIndex={1} width={"100%"}>
            <Box margin={"5px"}>
                <ZenCafeLogo vh={10} logoType={2}></ZenCafeLogo>
            </Box>
        </Box>
    </>)
}

export default Header;