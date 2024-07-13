import { Box } from "@mui/material";

type props =
    | { vw: number; vh?: never; horizontalLogo?: boolean }
    | { vw?: never; vh: number; horizontalLogo?: boolean };

// For the props above we used a union type or somthing. Basically, the user can either
// A: pass in a vw, horizontalLogo, but not a vh
// or
// B: pass in a vh, horizontalLogo, but not a vw
// I do this because I don't wan't to be able to give a vh and vw which would ruin the aspect ratio of the svg logo


const ZenCafeLogo = ({ horizontalLogo = false, vw, vh }: props) => {


    var zenCafeLogo = <></>;

    if (!horizontalLogo) {
        const aspectRatio = 374 / 399; // height/width

        var localVh = 0;
        var localVw = 0;

        if (typeof vh === "undefined") {
            localVw = vw;
            localVh = vw * aspectRatio;

            zenCafeLogo =
                <Box
                    sx={{
                        backgroundImage: `url("/svg/ZenCafeVerticalLogo.svg")`, // Load background image
                        backgroundSize: 'contain', // Scale the background image to fit within the container while preserving its aspect ratio
                        backgroundRepeat: 'no-repeat',
                        width: `${localVw}vw`, // Set the width of the container
                        height: `${localVh}vw`, // Automatically adjust the height based on the aspect ratio
                        zIndex: 1
                    }}
                />
        }

        if (typeof vw === "undefined") {
            localVh = vh;
            localVw = vh * (1 / aspectRatio);

            zenCafeLogo =
                <Box
                    sx={{
                        backgroundImage: `url("/svg/ZenCafeVerticalLogo.svg")`, // Load background image
                        backgroundSize: 'contain', // Scale the background image to fit within the container while preserving its aspect ratio
                        backgroundRepeat: 'no-repeat',
                        width: `${localVw}vh`, // Set the width of the container
                        height: `${localVh}vh`, // Automatically adjust the height based on the aspect ratio
                        zIndex: 1
                    }}
                />
        }
    } else {
        const aspectRatio = 254 / 645;

        var localVh = 0;
        var localVw = 0;

        if (typeof vh === "undefined") {
            localVw = vw;
            localVh = vw * aspectRatio;

            zenCafeLogo =
                <Box
                    sx={{
                        backgroundImage: `url("/svg/ZenCafeHorizontalLogo.svg")`, // Load background image
                        backgroundSize: 'contain', // Scale the background image to fit within the container while preserving its aspect ratio
                        backgroundRepeat: 'no-repeat',
                        width: `${localVw}vw`, // Set the width of the container
                        height: `${localVh}vw`, // Automatically adjust the height based on the aspect ratio
                        zIndex: 1
                    }}
                />
        }

        if (typeof vw === "undefined") {
            localVh = vh;
            localVw = vh * (1 / aspectRatio);

            zenCafeLogo =
            <Box
                sx={{
                    backgroundImage: `url("/svg/ZenCafeHorizontalLogo.svg")`, // Load background image
                    backgroundSize: 'contain', // Scale the background image to fit within the container while preserving its aspect ratio
                    backgroundRepeat: 'no-repeat',
                    width: `${localVw}vh`, // Set the width of the container
                    height: `${localVh}vh`, // Automatically adjust the height based on the aspect ratio
                    zIndex: 1
                }}
            />
        }
    }

    return (<>
        {zenCafeLogo}
    </>)
}

export default ZenCafeLogo