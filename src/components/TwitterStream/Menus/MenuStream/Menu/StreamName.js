import React, { useState } from 'react'
import { Modal } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';

function StreamName(props) {

    const style = {
        position: 'absolute',
        top: '55%',
        left: '47%',
        transform: 'translate(-40%, -50%)',
        width:'30%',
        bgcolor: 'background.paper',
        border: '2px solid #ffffff',
        boxShadow: 24,
        p: 2,
      };
      
      const[check,setcheckBox]=useState(false);

    return (
        <div style={{outline:'none'}}>
        <Modal  open={open} sx={{border:'none'}} 
        onClose={props.streamButtonColor}
        >
         
             <Box sx={{ ...style,outline:'none',padding:0 }}>
               <Box style={{padding:'20px'}}>
             <Stack spacing={2}>
     <Typography variant = 'body1' style={{fontWeight:'bold'}}>Stream Name</Typography>
     
  
      <TextField   label="Stream Name"
      inputProps={{style: {cursor: 'pointer',fontSize:10}}}
      InputLabelProps={{shrink: true, style: {fontSize: 13}}}
      
     sx={{cursor:'pointer'}}
     onClick={(e) => {
      setcheckBox(true)
    
    }}
  
  
     />
   
  
    
 
        
     

  
    </Stack>

    
</Box>

<Stack >

<Paper elavation={22} >

<Stack direction="row-reverse" spacing={5}  style={{padding:'15px'}} >


<Typography variant='button' style={{marginRight:10,cursor:'pointer',color:'#6d6d6d'}}
onClick={(e) => {
{ check && props.streamName(false)}
{check && props.hideNew()}
{check && props.streambutton(false)}
{check && props.filterContent(true)}
{check && props.streamMenu(true)}
{check && props.mediacontent(false)}
{check && props.keywordincludes(false)}
{check && props.actionbutton(false)}
{check && props.hidegrid()}
{check && props.streamButtonColor(false)}
{check && props.accountContent(false)}
{check && props.hashtagContent(false)}
{check && props.geographyContent(false)}
}} >Apply</Typography>

<Typography variant='button'
onClick={(e) => {
    {
   props.streamName(false)}
  
   {props.streamButtonColor(false)}
    
}}
style={{cursor:'pointer',color:'#6d6d6d'}}>
Cancel
</Typography>



<Typography variant='body2'  >Share with Team</Typography>
<Checkbox size="small"  style={{marginRight:10,marginBottom:10,padding:0}} 
onChange={(e) => {
  setcheckBox(!check)
  
  }}/>



</Stack>
</Paper>
</Stack>

    </Box>
    

        </Modal>
      
    </div>
    )
}

export default StreamName
