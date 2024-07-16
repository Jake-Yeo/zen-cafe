import { Box } from "@mui/material";
import { ReactElement } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";

interface props {
    elementArr: ReactElement[],
    width?: string,
    widthOfItems?: string,
    listRef: React.Ref<VirtuosoHandle>;
}

const VirtuosoElementList = ({ elementArr, width = "100%", widthOfItems = "100%", listRef }: props) => {
    return (
        <Virtuoso ref={listRef} style={{
            height: 400,
            width: width,
            overflowY: 'scroll',
            overflowX: 'hidden',
            scrollbarWidth: 'initial', // For Firefox
            scrollbarColor: 'rgba(255, 255, 255, 0.5) transparent', // For Firefox
            msScrollbarArrowColor: "transparent",
        }} totalCount={elementArr.length} itemContent={(index) => {
            return (
                <Box // This box will center the messages in the list
                    sx={{
                        width: "100%",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box // This sets the width of the messages
                        sx={{
                            width: widthOfItems,
                        }}
                    >
                        {elementArr[index]}
                    </Box>
                </Box>
            );
        }} />)
}

export default VirtuosoElementList