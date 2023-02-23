import React from "react";
import { Box, Typography } from '@mui/material/';

const Footer = () => {
    let copy = String.fromCodePoint(0x00A9);

    return (
        <footer>
            <Box bgcolor="#11171E" className="container footer">
                <Typography color="#fff" align="center">
                    Get copyrighted {copy}
                </Typography>
            </Box>
        </footer>
    )
}

export default Footer;