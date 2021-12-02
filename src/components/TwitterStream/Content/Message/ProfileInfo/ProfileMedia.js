import React from 'react'
import   MedLogo  from'../../../../../images/media.jpg'
import { Grid, Typography } from '@material-ui/core'
import { Logoimage } from '../../../../signup/signupElements'
import { Paper } from '@material-ui/core'
function ProfileMedia() {
    return (
        <Grid direction='row' style={{marginTop:'10px'}}  >
            <Grid items>
            <Paper style={{marginTop:'10px',height:'30%'}}>
                <Typography variant='subtitle1' style={{fontWeight:'bold', marginLeft:'30px'}}>
                    Southeast Conference
                    </Typography>
                    <Typography variant='body2' style={{marginLeft:'20px',marginTop:'10px'}}>
                        The 2022 football championship is coming soon and the tickets will be available 
                        in market.
                        </Typography>
            
               <Logoimage src={MedLogo} style={{width:'80%',marginTop:'20px'}}></Logoimage>
        </Paper>
        </Grid>
        </Grid>
    )
}

export default ProfileMedia
