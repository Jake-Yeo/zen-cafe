import { Box } from "@mui/material"
import { ReactNode } from "react"

interface props {
    children: ReactNode,
    gifPath: string,
    useBlur?: boolean,
    useVignette?: boolean,
}

const Background = ({ children, gifPath, useBlur = false, useVignette = false }: props) => {

    const vignette =
        <Box
            sx={{
                position: 'absolute',
                width: '100%', // 100% the width of the PARENT it's in instead of the browser window
                height: '100%',
                pointerEvents: 'none',
                opacity: 0.54,
                backgroundImage: 'radial-gradient(ellipse var(--radius-x, 50%) var(--radius-y, 50%), rgba(0,0,0,0), rgba(0,0,0,1))'
            }}>
        </Box>

    const colorOverlay =
        <Box
            sx={{
                position: 'absolute',
                width: '100%', // 100% the width of the PARENT it's in instead of the browser window
                height: '100%',
                pointerEvents: 'none',
                opacity: 0.1,
                backgroundColor: '#A40606',
                mixBlendMode: 'darken'
            }}>
        </Box>

    const blur =
        <Box
            sx={{
                position: 'absolute',
                width: '100%', // 100% the width of the PARENT it's in instead of the browser window
                height: '100%',
                pointerEvents: 'none',
                backdropFilter: 'blur(5px)',
            }}>
        </Box>

    const background =
        <Box sx={{
            backgroundImage: `url(${gifPath})`,
            width: '100vw',
            height: '100vh',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
        }}>
            {useVignette ? (vignette) : (<></>)}
            {useBlur ? (blur) : (<></>)}
            {colorOverlay}
            {children}
        </Box>


    return (<>
        {background}
    </>)
}

export default Background