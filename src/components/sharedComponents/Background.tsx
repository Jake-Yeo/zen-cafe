import { Box } from "@mui/material"
import { ReactNode } from "react"

interface props {
    children: ReactNode,
    gifPath: string
}

const Background = ({ children, gifPath }: props) => {
    return (<>
        <Box sx={{
            backgroundImage: `url(${gifPath})`,
            width: '100vw',
            height: '100vh'
        }}>
            {children}
        </Box>
    </>)
}

export default Background