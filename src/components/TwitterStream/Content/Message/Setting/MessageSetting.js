import * as React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from "@mui/material/IconButton/IconButton";


export default function MessageSetting() {
    return (
        <IconButton
            size="large"
            aria-label="show more"
            aria-haspopup="true"
            color="inherit"
        >
            <MoreHorizIcon sx={{fontSize: 30}} style={{
                fill: 'black',
                padding: 0,
                margin: 0
            }}/>
        </IconButton>
    )
}