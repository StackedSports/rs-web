
import React from 'react';
import { Stack } from '@mui/material';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';
import { Chip } from '@mui/material';
import { Grid } from '@mui/material';
function FilterContent() {
    return (
        
        <Stack direction='column' spacing={2} style={{marginLeft: '20px', marginTop: '20px', padding: 10}}>
              <Stack direction='column' >
                 
          
              <Typography variant='subtitle2'style={{fontWeight:'bold'}} >Filter/Search Criteria
              <Link
                component="edit"
                variant="body2"
                underline='always'
                style={{marginLeft:'42px',color:'#1a89ff'}}>
                        Edit
                            </Link>
              </Typography>
                  <Typography variant='subtitle2'style={{fontWeight:'bold'}}>Keywords: </Typography>
                  <Grid xs={2}>
                <Chip size='small' label="Season Tickets" style={{borderRadius: 5,backgroundColor:'#1a89ff',color:'white',fontSize:12}} />
                </Grid>
              </Stack>
              <Stack direction='column'  style={{marginTop:'50px'}}>
                <Typography variant='subtitle2'style={{fontWeight:'bold'}}>#HASHTAGS:</Typography>
                <Grid xs={2}>
                <Chip size='small' label="#VandeyGame" style={{borderRadius: 5,backgroundColor:'#1a89ff',color:'white',fontSize:12}} />
                </Grid>
            </Stack>

            <Stack direction='column'  >
                <Typography variant='subtitle2'style={{fontWeight:'bold'}}>Publisher:</Typography>
                <Grid xs={2}>
                <Chip size='small' label="Followers of @Vanderbiltathelitics" style={{borderRadius: 5,backgroundColor:'#1a89ff',color:'white',fontSize:12}} />
                <Chip size='small' label="Followers of @Vanderbiltfootball" style={{borderRadius: 5,backgroundColor:'#1a89ff',color:'white',fontSize:12}} />
                </Grid>
            </Stack>
            <Stack direction='column'  >
                <Typography variant='subtitle2'style={{fontWeight:'bold'}}>Content Type:</Typography>
                <Grid xs={2}>
                <Chip size='small' label="text" style={{backgroundColor:'#1a89ff',color:'white',fontSize:12,borderRadius: 5}} />
                <Chip size='small' label="With or without text" style={{borderRadius: 5,backgroundColor:'#1a89ff',color:'white',fontSize:12}} />
                </Grid>
            </Stack>
            <Stack direction='column'  >
                <Typography variant='subtitle2'style={{fontWeight:'bold'}}>Location:</Typography>
                <Grid xs={2}>
                <Chip size='small' label="Nashville TN" style={{borderRadius: 5,backgroundColor:'#1a89ff',color:'white',fontSize:12}} />
                </Grid>
            </Stack>
            <Stack direction='column'  >
                <Typography variant='subtitle2'style={{fontWeight:'bold'}}>Date:</Typography>
               <Grid xs={2}>
                <Chip size='small' label="Sep 1,2021" style={{borderRadius: 5,backgroundColor:'#1a89ff',color:'white',fontSize:12}} />
                </Grid>
            </Stack>
              </Stack>
    )
}

export default FilterContent
