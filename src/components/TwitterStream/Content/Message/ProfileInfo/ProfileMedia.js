import React from 'react'
import   MedLogo  from'../../../../../images/media.jpg'
import { Grid, Typography } from '@mui/material'
import { Logoimage } from '../../../../signup/signupElements'
import { Paper } from '@mui/material'
import { Avatar } from '@mui/material'
import { Box } from '@mui/system'
import { Card } from '@mui/material'
import ProfileAvatar from '../Avatar/ProfileAvatar'
import ProfileInfo from './ProfileInfo'
import MessageDetails from '../Details/Details'
import { CardContent } from '@mui/material'
import AvatarImg from "../../../../../images/avatar.jpeg";

function ProfileMedia() {



    return (
        <Grid direction='row' style={{width:'100%',height:'100%',marginTop:'10px'}}  >
            
            
            <Card variant="outlined" style={{ width: '100%'}}>
                <CardContent>
                    <Grid container direction="row">
                        <Avatar src ={AvatarImg} style={{width:28,height:28}}/>
                        <Box style={{width: '90%'}}>
                            <Grid container direction="column">
                                <Box>
                                    <Grid container direction="row">

                                       <Typography variant='subtitle2' 
                                       style={{fontWeight:'bold',marginLeft:'10px'}}>
                                           Geography
                                       </Typography>
                                        </Grid>
                                        </Box>
                                        <Box>
                                    <Typography  style={{fontSize: '12px',
                                           marginTop:'10px',
                                         
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'}}>
                                               It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                               </Typography>
                                               <div style={{padding:'8px'}}>
                                                   </div>
                         
                                    <Logoimage src={MedLogo} style={{width:'26vw',height:'25vh',margin:0,marginTop:0}}></Logoimage>
                                   
                                </Box>
                                </Grid>
                                </Box>
                                </Grid>
                                </CardContent>
                                </Card>
             
            
               
    
       
        </Grid>
    )
}

export default ProfileMedia
