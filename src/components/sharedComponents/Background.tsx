import { Box } from "@mui/material"
import { ReactNode } from "react"
import GifMetaData from "../../objects/GifMetaData";
const { v4: uuidv4 } = require('uuid');

interface props {
    children: ReactNode,
    gifPath?: string | undefined,
    useBlur?: boolean,
    useVignette?: boolean,
}

// everytime we add a gif to the gif file we need to manually add it to the list in this function
function getRandomGifPath(): string {
    const listOfGifs: GifMetaData[] = [];

    listOfGifs.push(new GifMetaData("/gif/RollyRocket.gif", "https://www.deviantart.com/valenberg/art/Rolly-Rocket-601618597", " Valenberg", "Rolly Rocket"));
    listOfGifs.push(new GifMetaData("/gif/BalconyVirtuaVerse.gif", "https://www.deviantart.com/valenberg/art/Balcony-VirtuaVerse-691023896", " Valenberg", "Balcony (VirtuaVerse)"));
    listOfGifs.push(new GifMetaData("/gif/May.gif", "https://www.deviantart.com/valenberg/art/May-694908676", " Valenberg", "May"));
    listOfGifs.push(new GifMetaData("/gif/Holograms.gif", "https://www.deviantart.com/kirokaze/art/Holograms-829518972", "kirokaze", "Holograms"));
    listOfGifs.push(new GifMetaData("/gif/CityReflection.gif", "https://www.deviantart.com/kirokaze/art/City-Reflection-722595891", "kirokaze", "City Reflection"));
    listOfGifs.push(new GifMetaData("/gif/LonelyLights.gif", "https://www.deviantart.com/kirokaze/art/Lonely-Lights-865673589", "kirokaze", "Lonely Lights"));
    listOfGifs.push(new GifMetaData("/gif/CoffeeInRain.gif", "https://www.deviantart.com/kirokaze/art/Coffee-In-rain-558860147", "kirokaze", "Coffee In Rain"));
    listOfGifs.push(new GifMetaData("/gif/ViewOverAJapaneseCity.gif", "https://www.reddit.com/r/PixelArt/comments/5uybyu/oc_view_over_a_japanese_city_animated/", " LennSan", "View over a Japanese City"));
    listOfGifs.push(new GifMetaData("/gif/Doves.gif", "https://www.deviantart.com/cat-meff/art/Test-animations-on-tumblr-703488131", "cat-meff", "Doves"));
    listOfGifs.push(new GifMetaData("/gif/Lowlands.gif", "https://www.deviantart.com/valenberg/art/Lowlands-549814698", "Valenberg", "Lowlands"));
    listOfGifs.push(new GifMetaData("/gif/midnightdesk.gif", "https://www.deviantart.com/port1220/art/midnight-desk-981816932", "Port1220", "midnight desk"));
    listOfGifs.push(new GifMetaData("/gif/Waitingthesnow.gif", "https://www.deviantart.com/kirokaze/art/Waiting-the-snow-654289559", "kirokaze", "Waiting the snow"));
    listOfGifs.push(new GifMetaData("/gif/Window.gif", "https://www.deviantart.com/danc3r10/art/DAY-7-WINDOW-894205187", "danc3r10", "Window"));
    listOfGifs.push(new GifMetaData("/gif/Convergence.gif", "https://www.deviantart.com/danc3r10/art/Convergence-886894361", "danc3r10", "Convergence"));
    listOfGifs.push(new GifMetaData("/gif/ViewoverJapaneseValleyinAutumn.gif", "https://www.reddit.com/r/PixelArt/comments/fovvoo/view_over_japanese_valley_in_autumn_animated/", "LennSan", "View over Japanese Valley in Autumn"));

    const randomIndex = Math.floor(Math.random() * listOfGifs.length);

    const randomGifPath = listOfGifs.at(randomIndex)?.getGifPath();

    if (!randomGifPath) {
        return "";
    }
    
    return randomGifPath;
}

// if gifPath is not provided, then a random gif will be selected for the background
const Background = ({ children, gifPath, useBlur = false, useVignette = false}: props) => {

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

            if (typeof gifPath === "undefined") {
                gifPath = getRandomGifPath();
            }

    const background =
        <Box sx={{
            minWidth: "100px",
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