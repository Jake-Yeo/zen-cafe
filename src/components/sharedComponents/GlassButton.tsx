import Button from "@mui/material/Button"
const { v4: uuidv4 } = require('uuid');

interface props {
    text: string,
    fontSize?: number,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    width?: string,
    minWidth?: string,
    margin?: string,
    marginTop?: string,
    marginBottom?: string,
    marginLeft?: string,
    marginRight?: string,
}

//https://stackoverflow.com/questions/32805670/what-does-before-and-after-do-in-css very useful for me when I made this button
const GlassButton = ({
    text,
    fontSize = 14,
    onClick = () => { },
    width = '50vw',
    minWidth = "100px",
    margin = "0px",
    marginTop = "0px",
    marginBottom = "0px",
    marginRight = "0px",
    marginLeft = "0px",
}: props) => {

    const textContent = `"${text}"`;

    return (<>
        <Button key={uuidv4()}
            sx={{
                borderRadius: '5em',
                backgroundColor: 'transparent',
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)",
                overflow: 'hidden',
                height: `${fontSize + 20}px`,
                width: width,
                minWidth: minWidth,
                padding: '20px',
                margin: margin,
                marginTop: marginTop,
                marginBottom: marginBottom,
                marginLeft: marginLeft,
                marginRight: marginRight,
                '&::after': {
                    content: textContent,
                    color: 'white',
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: fontSize
                },
                '&::before': {
                    content: '""',
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    mixBlendMode: 'multiply',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: '#903487',
                    transition: 'background-color 0.3s ease', // Transition for background color
                },
                '&:hover::before': {
                    content: "''",
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    mixBlendMode: 'multiply',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: '#ffffff',
                    transition: 'background-color 0.3s ease', // Transition for background color
                },
                '&:hover .MuiTouchRipple-root': {
                    color: 'Purple', // Change the ripple in color when clicked
                },
                '& .MuiTouchRipple-root': {
                    color: 'Purple', // Change fade-out ripple color
                },

            }}
            onClick={onClick}>
        </Button>
    </>)
}

export default GlassButton