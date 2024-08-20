import { Box } from "@mui/material";
import Button from "@mui/material/Button"
const { v4: uuidv4 } = require('uuid');

interface props {
    text: string,
    content?: string,
    height?: string,
    fontSize?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    width?: string,
    minWidth?: string,
    margin?: string,
    marginTop?: string,
    marginBottom?: string,
    marginLeft?: string,
    marginRight?: string,
    borderTopRightRadius?: string,
    borderTopLeftRadius?: string,
    borderBottomRightRadius?: string,
    borderBottomLeftRadius?: string,
    padding?: string,
    boxShadow?: string,
    rotate?: string,
}

//https://stackoverflow.com/questions/32805670/what-does-before-and-after-do-in-css very useful for me when I made this button
const FrostedButton = ({
    text,
    content,
    fontSize = "14px",
    onClick = () => { },
    width = '50%',
    minWidth = "100px",
    margin = "0px", // This does not work since margin Top, bottom, left, right all overide it!
    marginTop = "0px",
    marginBottom = "0px",
    marginRight = "0px",
    marginLeft = "0px",
    borderTopRightRadius = "5em",
    borderTopLeftRadius = "5em",
    borderBottomRightRadius = "5em",
    borderBottomLeftRadius = "5em",
    padding = "10px",
    height = "auto",
    boxShadow = "0px 5px 10px rgba(0, 0, 0, 0.7)",
    rotate = 'rotate(0deg)'
}: props) => {

    return (<>
        <Button
            sx={{
                borderTopRightRadius: borderTopRightRadius,
                borderTopLeftRadius: borderTopLeftRadius,
                borderBottomRightRadius: borderBottomRightRadius,
                borderBottomLeftRadius: borderBottomLeftRadius,
                backdropFilter: 'blur(10px) saturate(150%)', // Apply the blur effect
                transition: 'backdrop-filter 0.3s ease', // Transition for background color
                backgroundColor: 'rgba(144, 52, 135, 0.001)', // Semi-transparent background color
                boxShadow: boxShadow,
                overflow: 'hidden',
                height: height,
                color: 'white',
                width: width,
                minWidth: minWidth,
                padding: padding,
                margin: margin,
                marginTop: marginTop,
                marginBottom: marginBottom,
                marginLeft: marginLeft,
                marginRight: marginRight,
                '&:hover': {
                    //  backgroundColor: 'rgba(144, 52, 135, 0.5)', // Semi-transparent background color
                    backdropFilter: 'blur(0px) saturate(400%)', // Apply the blur effect
                    transition: 'backdrop-filter 0.3s ease', // Transition for background color
                },
                '&:hover .MuiTouchRipple-root': {
                    color: 'White', // Change the ripple in color when clicked
                },
                '& .MuiTouchRipple-root': {
                    color: 'White', // Change fade-out ripple color
                },
            }}
            onClick={onClick}>
            {content ?
            <Box sx={{
                rotate: rotate,
                backgroundImage: content,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                width: '100%', // Adjust to match your design
                height: '100%', // Adjust to match your design
            }}>

            </Box>
                : text}
            {/** Here we put invisible text identical to the text in content, this is because text here will actually resize the button when the words wrap around, whereas for the text in the ::after context, it will not tell the button to expand vertically to allocate space to show its content*/}
        </Button>
    </>)
}

export default FrostedButton