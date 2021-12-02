import * as React from 'react';
import IconButton from "@mui/material/IconButton/IconButton";
import Grid from "@mui/material/Grid/Grid";


import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function Actions(){
    return(
        <Grid container direction="row" justifyContent="space-between">
            <IconButton
                size="medium"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
            >
                <ChatBubbleOutlineIcon sx={{fontSize: 20}}
                                       style={{fill: '#c2c9d0'}}/>
            </IconButton>
            <IconButton
                size="medium"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
            >
                <RepeatOutlinedIcon sx={{fontSize: 20}}
                            style={{fill: '#c2c9d0'}}/>
            </IconButton>
            <IconButton
                size="medium"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
            >
                <FavoriteBorderIcon sx={{fontSize: 20}}
                                    style={{fill: '#c2c9d0'}}/>
            </IconButton>

            <IconButton
                size="medium"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
            >
                <IosShareOutlinedIcon sx={{fontSize: 20}}
                                 style={{fill: '#c2c9d0'}}/>
            </IconButton>

            <IconButton
                size="medium"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
            >
                <BarChartIcon sx={{fontSize: 20}}
                              style={{fill: '#c2c9d0'}}/>
            </IconButton>
        </Grid>
    )
}