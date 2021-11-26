import * as React from 'react';
import CardContent from "@mui/material/CardContent/CardContent";
import Grid from "@mui/material/Grid/Grid";
import Box from "@mui/material/Box/Box";
import CardActions from "@mui/material/CardActions/CardActions";
import Card from "@mui/material/Card/Card";
import {Fragment} from "react";


import ProfileAvatar from '../Content/Message/Avatar/ProfileAvatar'
import ProfileInfo from '../Content/Message/ProfileInfo/ProfileInfo'
import MessageSetting from '../Content/Message/Setting/MessageSetting'
import MessageDetails from '../Content/Message/Details/Details'
import MessageActions from '../Content/Message/Actions/Actions'


export default function Content() {
    return (
        <Fragment>

            <Card variant="outlined" style={{padding: 10, width: '100%'}}>
                <CardContent>
                    <Grid container direction="row">
                        <ProfileAvatar/>
                        <Box style={{width: '90%'}}>
                            <Grid container direction="column">
                                <Box>
                                    <Grid container direction="row">

                                        <ProfileInfo/>

                                        <Box sx={{flexGrow: 1}}></Box>

                                        <MessageSetting/>
                                    </Grid>
                                </Box>
                                <Box>
                                    <MessageDetails/>
                                </Box>
                            </Grid>
                            <Box sx={{flexGrow: 1}}/>
                            <Box style={{marginTop: '10px'}}>
                                <MessageActions/>
                            </Box>
                        </Box>
                    </Grid>
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>


            <Card variant="outlined" style={{padding: 10, width: '100%'}}>
                <CardContent>
                    <Grid container direction="row">
                        <ProfileAvatar/>
                        <Box style={{width: '90%'}}>
                            <Grid container direction="column">
                                <Box>
                                    <Grid container direction="row">

                                        <ProfileInfo/>

                                        <Box sx={{flexGrow: 1}}></Box>

                                        <MessageSetting/>
                                    </Grid>
                                </Box>
                                <Box>
                                    <MessageDetails/>
                                </Box>
                            </Grid>
                            <Box sx={{flexGrow: 1}}/>
                            <Box style={{marginTop: '10px'}}>
                                <MessageActions/>
                            </Box>
                        </Box>
                    </Grid>
                    {/*Reply*/}
                    <Grid container direction="row" style={{marginTop: '20px'}}>

                        <ProfileAvatar/>
                        <Box style={{width: '90%'}}>
                            <Grid container direction="column">
                                <Box>
                                    <Grid container direction="row">
                                        <ProfileInfo/>
                                        <Box sx={{flexGrow: 1}}></Box>
                                    </Grid>
                                </Box>


                                <Box>
                                    <MessageDetails/>
                                </Box>

                            </Grid>


                        </Box>
                    </Grid>
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>


            <Card variant="outlined" style={{padding: 10, width: '100%'}}>
                <CardContent>
                    <Grid container direction="row">
                        <ProfileAvatar/>
                        <Box style={{width: '90%'}}>
                            <Grid container direction="column">
                                <Box>
                                    <Grid container direction="row">

                                        <ProfileInfo/>

                                        <Box sx={{flexGrow: 1}}></Box>

                                        <MessageSetting/>
                                    </Grid>
                                </Box>
                                <Box>
                                    <MessageDetails/>
                                </Box>
                            </Grid>
                            <Box sx={{flexGrow: 1}}/>
                            <Box style={{marginTop: '10px'}}>
                                <MessageActions/>
                            </Box>
                        </Box>
                    </Grid>
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>

        </Fragment>

    )
}