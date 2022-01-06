import React from 'react'
import { Paper, Typography } from '@mui/material'
import ClearIcon from '@material-ui/icons/Clear'
import { Stack } from '@mui/material'
function HashtagContent(props) {
    return (
       
             <Stack direction='row'>
          
          <Paper
                  style={{
                      borderRadius: 5,
                      marginLeft:'28.5px',
                      marginTop:'15px',
                      marginBottom:'10px',
                      color: 'black',
                      background: 'white',
                      borderColor:'#E1E1E1',
                      cursor:'default',
                      height:35
                     
                     
                      

                  }}
                 
                  variant="outlined"
                  >
                   <Typography variant='body2' style={{borderRadius: 5,
                      marginLeft:'15px',
                      fontSize: '13px',
                      fontWeight: 'bold',marginTop:'7px'}}>  
                    Hashtag Rules: Includes
                   <ClearIcon onClick={(e) => {
                      props.hashtagContent(false)

                     }}
                 
                     style={{fill: '#ff1616',marginLeft:'22px',marginRight:'10px',fontSize:15,cursor:'pointer'}}/>
                     </Typography>
                     
                  </Paper>
                  
         
      </Stack>
       
    )
}

export default HashtagContent
