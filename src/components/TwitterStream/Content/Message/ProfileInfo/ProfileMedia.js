import React from 'react'
import   MedLogo  from'../../../../../images/media.jpg'
import { Grid } from '@material-ui/core'
import { Logoimage } from '../../../../signup/signupElements'
import { Paper } from '@material-ui/core'
function ProfileMedia() {
    return (
        <Grid direction='row' style={{marginTop:'10px'}}  >
            <Grid items>
            <Paper style={{}}>
            
               <Logoimage src={MedLogo} style={{width:'80%'}}></Logoimage>
        </Paper>
        </Grid>
        </Grid>
    )
}

export default ProfileMedia
