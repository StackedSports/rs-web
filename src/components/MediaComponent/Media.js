import React from 'react'
import Sidebar from '../common/sidebar/sidebar'
import MyMedia from './MediaSidebar/MyMedia'
import { DarkContainer } from '../common/Elements/Elements'
import { Grid } from '@material-ui/core'
import Dashboard from './MediaDashboard/dashboard'
import { Divider } from '@material-ui/core'
function Media() {
    return (
        <div>
            <Sidebar  media={true}/>
            <DarkContainer contacts style={{ padding: 10, marginLeft: 60 }}>
                <Grid container direction='row'>
                    <Grid xs={2}>
            <MyMedia/>
            </Grid>
            <Grid  xs={10} style={{backgroundColor:'white'}} >
          <Grid direction='column' >
            <Grid xs={12}>
              
        <Dashboard/>
        </Grid>
        <Divider variant ='middle' />
      </Grid>  
       </Grid>
            </Grid>
            </DarkContainer>
        </div>
    )
}

export default Media
