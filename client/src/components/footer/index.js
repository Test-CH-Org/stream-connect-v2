import React from "react";
import Typography from '@mui/material/Typography';

const Footer = () => {
    let copy = String.fromCodePoint(0x00A9);

    return (
        <footer
            className="mui--text-light"
        >
            <div className="container footer">
                <Typography color="common.black" align="center">
                    Get copyrighted {copy}
                </Typography>
            </div>
        </footer>
    )
}

export default Footer;