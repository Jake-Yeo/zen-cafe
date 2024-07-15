import { ReactElement, useEffect, useRef, useState } from "react";
import ChatroomMetadata from "../../objects/ChatroomMetadata"
import ChatroomDetailCard from "./ChatroomDetailCard";
import { ListChildComponentProps, VariableSizeList } from 'react-window';
import ListItem from "@mui/material/ListItem";
import { ListItemText } from "@mui/material";
import React from "react";

interface props {
    elementArr: ReactElement[]
}

var listItemComponentSize: number[] = [];
var listItemComponentRefs: React.RefObject<HTMLDivElement>[] = [];


interface ListItemComponentPropsExtended extends ListChildComponentProps {
    addSize: (height: number, index: number) => void
    elementArr: ReactElement[],
}



// !!! When using React-Window components don't forget to pass in the props.style!! https://stackoverflow.com/questions/56737563/react-window-and-infinite-loader-scrolling-issue
const ListItemComponent = ({ index, style, addSize, elementArr }: ListItemComponentPropsExtended) => { // So how this works I think is that the FixSizeList will pass props into this automatically. The props contains an index, we can use this index to get the right stat.
    const licRef = useRef<HTMLDivElement>(null);

    const listItem = (
        // So because the div takes on the style of the prop, we don't know what its height is styled to, so we useRef on the ListItem instead to get the height
        <div style={style}>
            <ListItem ref={licRef} onClick={(e) => (console.log(licRef.current?.clientHeight))} key={index} component="div" disablePadding>
                <ListItemText primary={elementArr[index]}/>
            </ListItem>
        </div>)


    listItemComponentRefs.push(licRef);


    React.useEffect(() => {
        addSize(licRef.current?.clientHeight ?? 0, index);
    }, [addSize, index]);


    return (listItem);
};

const ChatroomList = ({ elementArr }: props) => {

    const listRef = useRef<VariableSizeList>(null);

    const getSize = (index: number) => {
        return listItemComponentSize.at(index) || 0; // This is the getSize function
    };

    const addSize = (height: number, index: number) => { // This will be called by the ListItemComponent function when index or addSize change state. They change state after they mount I beleive which is why this works. In previous versions all our attemps called or tried to re-render befor the components mounted! That is why we were getting undefined heights!
        listItemComponentSize.push(height); // We add height to the listItemComponentSize array
        listRef.current?.resetAfterIndex(index); // Effectivly just a re-render
    }

    const [height, setHeight] = useState(window.innerHeight * 0.5);

    useEffect(() => {
        const handleResize = () => {
            // Calculate the desired height here, for example, 80% of window height
            setHeight(window.innerHeight * 0.5);
        };

        // Initial calculation
        handleResize();

        // Add event listener for resize
        window.addEventListener('resize', handleResize);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (<>
        <VariableSizeList
            ref={listRef}
            height={height}
            width={`${50}vw`}
            itemSize={(index: number) => getSize(index)}
            itemCount={elementArr.length}
            overscanCount={5}
            style={{
                overflowY: 'scroll',
                overflowX: 'hidden',
                scrollbarWidth: 'initial', // For Firefox
                scrollbarColor: '#B6AAD7 transparent', // For Firefox
                msScrollbarArrowColor: "transparent",
            }}
        >
            {({ index, style }) => (
                <ListItemComponent index={index} style={{
                    ...style,
                }} data={undefined} addSize={addSize} elementArr={elementArr}></ListItemComponent>
            )}
        </VariableSizeList >
    </>)
}

export default ChatroomList