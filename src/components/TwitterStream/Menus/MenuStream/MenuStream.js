import * as React from 'react';
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Grid from "@mui/material/Grid/Grid";

import { Divider } from "@material-ui/core";
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import TuneIcon from '@mui/icons-material/Tune';
import AccountCircle from "@mui/material/SvgIcon/SvgIcon";
import IconButton from "@mui/material/IconButton/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { useStyles } from '../../../MessageCreate';
export default function MenuStream(props) {

    const [showSideFilters, setshowSideFilters] = useState(true);
    const [showMyStreams,setshowMyStreams] = useState(false);
 
    return (
       <div >
        <Grid container direction="row" alignItems="center"
              style={{marginLeft: '20px', marginTop: '20px', padding: 10}}>
                   
            <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
            >
                <FormatAlignLeftIcon sx={{fontSize: 27}} style={{fill: '#000'}} onClick={(e) => {
                          props.handleSideFilters();
                        }}/>

              
            </IconButton>
            <Typography style={{fontWeight: 'bold', fontSize: '15px', marginLeft: '20px'}}>Twitter
                Stream</Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Typography marginLeft='10px' variant='subtitle1' fontWeight='bold'> Filter : 
                 </Typography>
                <Button
                    style={{
                        borderRadius: 5,
                        marginLeft:'20px',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: 'black',
                        background: 'white',
                    }}
                    size='medium'
                    variant="outlined"
                    endIcon={<ClearIcon sx={{fontSize: 25}} style={{fill: 'red'}}/>}>
                    Action</Button>
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
                    endIcon={<TuneIcon sx={{fontSize: 40}} style={{fill: '#3871da'}}/>}>
                    Filter</Button>
            </Box>
           
        </Grid>
        </div>
    );
}