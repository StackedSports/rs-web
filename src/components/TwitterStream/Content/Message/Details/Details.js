import * as React from 'react';
import Typography from "@mui/material/Typography/Typography";
import Grid from "@mui/material/Grid/Grid";


export default function Details() {
    return (
        <Grid container direction="row">
            <Typography
                style={{
                    fontSize: '18px',
                    marginLeft: '20px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                How much are tickets going for
                @VandyFootball???</Typography>
        </Grid>
    )
}