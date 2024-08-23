import { Box } from "@mui/material";
import { ReactElement, useEffect, useRef } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";

interface props {
    elementArr: ReactElement[],
    width?: string,
    height?: string,
    widthOfItems?: string,
    scrollToBottomAtStart?: boolean
}

const VirtuosoElementList = ({ elementArr, width = "100%", widthOfItems = "100%", height = "60%", scrollToBottomAtStart = false }: props) => {

    const virtuosoRef = useRef<VirtuosoHandle>(null);

    var indexToStartFrom = 0;

    if (scrollToBottomAtStart) {
        indexToStartFrom = elementArr.length - 1;
    }

    return (
            <Virtuoso ref={virtuosoRef}
                followOutput="smooth" //https://github.com/petyosi/react-virtuoso/issues/199
                initialTopMostItemIndex={indexToStartFrom} // https://virtuoso.dev/initial-index/
                style={{
                    width: width,
                    height: height,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    scrollbarWidth: 'initial', // For Firefox
                    scrollbarColor: 'rgba(255, 255, 255, 0.5) transparent', // For Firefox
                    msScrollbarArrowColor: "transparent",
                }} totalCount={elementArr.length} itemContent={(index) => {
                    return (
                        <Box // This box will center the elements in the list
                            sx={{
                                width: "100%",
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box // This sets the width of the elements
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