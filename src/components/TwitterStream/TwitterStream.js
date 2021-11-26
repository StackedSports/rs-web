import * as React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid'



import Header from './Header/Header';
import MainMenu from './Menus/MenuMain/MenuMain';
import MenuNewMessage from './Menus/MenuNewMessage/MenuNewMessage'
import MenuStream from './Menus/MenuStream/MenuStream'
import Contents from './Content/Content'





export default function TwitterStream() {

    return (
        <Box sx={{flexGrow: 1}} style={{marginLeft: 20, marginRight: 20}}>
            <Header/>
            <Grid container direction="row">
                <MainMenu/>
                <MenuNewMessage/>
                <Box sx={{flexGrow: 1, background: "white"}}>
                    <MenuStream/>
                    <Divider style={{marginLeft: '20px'}}/>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid xs={2}>
                        </Grid>
                        <Grid xs={6}>
                            <Box sx={{flexGrow: 1, marginTop: '15px'}}>
                                <Grid container direction="column" alignItems="center" justifyContent="center">
                                    <Contents/>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid xs={2}>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Box>


    );
}