import * as React from 'react';
import IconButton from "@mui/material/IconButton/IconButton";
import Grid from "@mui/material/Grid/Grid";


import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function Actions(){
    return(
        <Grid container direction="row" justifyContent="space-between">
            <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
            >
                <ChatBubbleOutlineIcon sx={{fontSize: 40}}
                                       style={{fill: '#c2c9d0'}}/>
            </IconButton>
            <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
            >
                <ReplayIcon sx={{fontSize: 40}}
                            style={{fill: '#c2c9d0'}}/>
            </IconButton>
            <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
            >
                <FavoriteBorderIcon sx={{fontSize: 40}}
                                    style={{fill: '#c2c9d0'}}/>
            </IconButton>

            <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
            >
                <ArrowUpwardIcon sx={{fontSize: 40}}
                                 style={{fill: '#c2c9d0'}}/>
            </IconButton>

            <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
            >
                <BarChartIcon sx={{fontSize: 40}}
                              style={{fill: '#c2c9d0'}}/>
            </IconButton>
        </Grid>
    )
}