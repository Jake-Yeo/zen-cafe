import { Button, IconButton, Snackbar, SnackbarCloseReason } from "@mui/material"
import React from "react";

interface props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    message: string,
}

const CustomSnackbar = ({ open, setOpen, message }: props) => {

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (<>
        <Snackbar
              ContentProps={{
                sx: {
                  background: "#bf0000"
                }
              }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={message}
            key={"bottom" + "bottom"}
        />
    </>)
}

export default CustomSnackbar