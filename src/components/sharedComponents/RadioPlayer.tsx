import { useEffect, useState } from "react";
import Playlist from "../../objects/Playlist";
import { getRadio } from "../../functions/ZCByteVaultApi";
import Radio from "../../objects/Radio";


const RadioPlayer = () => {

    const [radio, setRadio] = useState<Radio>();

    useEffect(() => {
        const getAndSetRadio = async () => {
            const radio = await getRadio();
            if (radio) {
                setRadio(radio);
            }
        }
        getAndSetRadio();
    }, [])

    return (<></>)
}

export default RadioPlayer