import * as React from 'react';
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Grid from "@mui/material/Grid/Grid";


import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccountCircle from "@mui/material/SvgIcon/SvgIcon";
import IconButton from "@mui/material/IconButton/IconButton";


export default function MenuStream() {
    return (
        <Grid container direction="row" alignItems="center"
              style={{marginLeft: '20px', marginTop: '20px', padding: 10}}>

            <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
            >
                <MenuOpenIcon sx={{fontSize: 27}} style={{fill: '#000'}}/>
            </IconButton>
            <Typography style={{fontWeight: 'bold', fontSize: '15px', marginLeft: '20px'}}>Twitter
                Stream</Typography>
            <Box sx={{flexGrow: 0.9}}>
            </Box>

            <Box>
                <Button
                    style={{
                        borderRadius: 5,
                        padding: 10,
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: 'black',
                        background: 'white',
                    }}
                    variant="outlined"
                    endIcon={<AutoFixHighIcon sx={{fontSize: 25}} style={{fill: '#3871da'}}/>}>
                    Action</Button>

                <Button
                    style={{
                        borderRadius: 5,
                        padding: 10,
                        marginLeft: 10,
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: 'black',
                        background: 'white',
                    }}
                    variant="outlined"
                    endIcon={<FilterListIcon sx={{fontSize: 40}} style={{fill: '#3871da'}}/>}>
                    Filter</Button>
            </Box>
        </Grid>
    );
}