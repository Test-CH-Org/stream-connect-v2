import React from 'react';
import { Grid, Box } from '@mui/material/';

const searchResults = () => {

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <p>xs=8</p>
                </Grid>
                <Grid item xs={4}>
                    <p>xs=4</p>
                </Grid>
                <Grid item xs={4}>
                    <p>xs=4</p>
                </Grid>
                <Grid item xs={4}>
                    <p>xs=4</p>
                </Grid>
            </Grid>
        </Box>
    )
}

export default searchResults;