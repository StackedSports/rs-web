import React, { useState } from 'react'
import { Modal } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
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
      const txtValue="Season Ticket Oct";
      const[check,setcheckBox]=useState(false);

    return (
        <div style={{outline:'none'}}>
        <Modal  open={open} sx={{border:'none'}}  >
         
             <Box sx={{ ...style,outline:'none',padding:0 }}>
               <Box style={{padding:'20px'}}>
             <Stack spacing={2}>
     <Typography variant = 'body1' style={{fontWeight:'bold'}}>Stream Name</Typography>
     
  
      <TextField   label="Stream Name"
      inputProps={{style: {cursor: 'pointer',fontSize:10}}}
      InputLabelProps={{style: {fontSize: 13}}}
      
     sx={{cursor:'pointer'}}
     onClick={(e) => {
      setcheckBox(true)
    
    }}
    value={check ?txtValue:''}
  
     />
   
  
    
 
        
     

  
    </Stack>

    
</Box>

<Stack >

<Paper elavation={22} style={{display:'flex',marginTop:'0.5px',flexDirection:'row-reverse',height:'7vh',width:'100%'}}>




<Typography variant='button' style={{marginRight:'10px',cursor:'pointer',color:'#6d6d6d',padding:'10px'}}
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
{check && props.streamButton(false)}
}} >Apply</Typography>
<Typography variant='button'
style={{marginRight:'10px',cursor:'default',color:'#6d6d6d',padding:'10px'}}>
Cancel
</Typography>



<Typography variant='body2'  style={{marginRight:'55px',marginTop:'13px'}}>SharewithTeam</Typography>
<Checkbox size="small"  checked={check} onChange={(e) => {setcheckBox(!check)}}/>




</Paper>
</Stack>

    </Box>
    

        </Modal>
      
    </div>
    )
}

export default StreamName
