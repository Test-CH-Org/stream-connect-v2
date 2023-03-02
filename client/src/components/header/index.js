import React from "react";
import { Box, Typography } from '@mui/material/';
import Logo from "../logo/index";

const Header = () => {

    return (
        <header>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                py: 2,
                bgcolor: '#11171E',
                width: '100%',
                position: 'absolute'
            }}
                className="container header"
            >

                <Typography color="#fff" align="center">
                    <Logo/>
                </Typography>
            </Box>
        </header>
    )
}

export default Header;