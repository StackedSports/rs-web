import React from 'react'
import { Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import { CheckBox } from '@material-ui/icons';
function TweetTypes(props) {
    const [contentype, setContentype] = React.useState("");
    const [check, setcheckBox] = React.useState(false);
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
     
    return (
        <div style={{outline:'none'}}>
            <Modal  open={open} sx={{border:'none'}} 
             onClose={(event, reason) => {
           
              props.types(false)
               
             }}
            
            >
             
                 <Box sx={{ ...style,outline:'none',padding:0 }}>
                   <Box style={{padding:'20px'}}>
                 <Stack spacing={2}>
         <Typography variant = 'body1' style={{fontWeight:'bold'}}>Content Type</Typography>
         
        
          <FormGroup>
            
         
         <Stack direction='row'>
         <Checkbox size ="small"
         onClick={(e) => {
          { setcheckBox(true)}
          
         }}
         
         />
         
           <Typography variant='body2'  style={{marginTop:'10px',cursor:'default'}}>Exclude Retweets</Typography>
           </Stack>
         
 
 
   
      <Stack direction='row'>
    <Checkbox size ="small"  
      onClick={(e) => {
        { setcheckBox(true)}
        
       }}/>
         
           <Typography variant='body2'  style={{marginTop:'10px',cursor:'default'}} >Only show Tweets with Media</Typography>
           
      </Stack>
  
    </FormGroup>
        </Stack>

        
   </Box>
 
   <Stack >
   <Paper elavation={22} style={{display:'flex',flexDirection:'row-reverse',marginLeft : '-1.3px',width:'100.6%',   borderRadius: 0,}}>
 <Typography variant='button' style={{marginRight:'10px',cursor:'pointer',color:'#6d6d6d',padding:'10px'}}
 onClick={(e) => {
  {check && props.media(true)}
  {check && props.types(false)}
  e.stopPropagation();
 }} >Apply</Typography>
 <Typography variant='button'
  style={{marginRight:'10px',cursor:'pointer',color:'#6d6d6d',padding:'10px'}}
  onClick={(e) => {
   
    props.types(false)
    e.stopPropagation();
     }}
  >
   Cancel
   </Typography>
  </Paper>
    </Stack>
 
        </Box>
        

            </Modal>
          
        </div>
    )
}

export default TweetTypes
