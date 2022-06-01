import React from 'react'
import { Modal } from '@mui/material'
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from "@mui/styles";
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';

import { Paper } from '@mui/material';
function HastagRules(props) {

    
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
      const [tweet, setTweet] = React.useState(null);
      const [circleIcon, setCircleIcon] = React.useState(false);
      const [begin,setbegin]= React.useState(false);
      const handleChange = (event) => {
        setTweet(event.target.value);
        event.stopPropagation();
       
      };

      const useStyles = makeStyles((theme)=>({
      
        afterSelect:{
            borderColor: '#E1E1E1',
            
        },
        icon:{
        "& .MuiChip-label": {
         paddingLeft:'0px'
        }
      },
      select:{
      
        
        "& .MuiSelect-select":{
            border:'2.3px solid #1976d2',
            borderRadius: "5px 5px 0 0"
          
        },
       
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "1px solid black",
          borderColor:'black',
          borderRadius: "5px 5px 0 0"
        }
      
      }

      }));
      const classes = useStyles();

    return (
        <div style={{outline:'none'}}>
        <Modal  open={open} sx={{border:'none'}} 
        
        onClose={(event, reason) => {
           
            props.hashtagRules(false)
             
           }}
        >
         
             <Box sx={{ ...style,outline:'none',padding:0 }}>
               <Box style={{padding:'20px'}}>
             <Stack spacing={2}>
     <Typography variant = 'subtitle1' style={{fontWeight:'bold'}}>Hashtag Rules</Typography>
     
     <FormControl   size='small' style={{width:'50%'}} >
     
      <Select
       
      className={classes.select}
      value={tweet}
      displayEmpty
      
      inputProps={{ "aria-label": "Without label" }}
      onChange={handleChange}>
        
          <MenuItem value={10} ><Typography variant = 'subtitle2' >
              Tweet Includes</Typography></MenuItem>
      <MenuItem value={20}><Typography variant = 'subtitle2' >
      Exclude Tweets with</Typography></MenuItem>
      <MenuItem value={30}><Typography variant = 'subtitle2' >
      Exact Match</Typography></MenuItem>
      </Select>
     </FormControl>
     <FormControl fullWidth size='small'>
     <TextField label="Search or Create New Hashtag Match" type="search" fullWidth size='small' />
    </FormControl>
    <Typography variant = 'subtitle2' style={{fontWeight:'bold',marginLeft:'10px'}}>VandyvsUK</Typography>
    <Typography variant = 'subtitle2' style={{fontWeight:'bold',marginLeft:'10px'}}>VandyUK</Typography>
    <Typography variant = 'subtitle2' style={{fontWeight:'bold',marginLeft:'10px'}}>KentuckyvsVanderbilt</Typography>
    
  
  
    </Stack>

    
</Box>
<Stack >


<Paper elavation={7} style={{display:'flex',flexDirection:'row-reverse',marginLeft : '-1.3px',width:'100.6%',   borderRadius: 0,}}>
<Typography variant='button' style={{marginRight:'10px',cursor:'pointer',color:'#6d6d6d',padding:'10px'}}
onClick={(e) => {
{tweet && props.hashtagContent(true)}
{ tweet && props.hashtagRules(false)}
e.stopPropagation();
}} >Apply</Typography>
<Typography variant='button'
style={{marginRight:'10px',cursor:'pointer',color:'#6d6d6d',padding:'10px'}}
onClick={(e) => {
   
    props.hashtagRules(false)
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

export default HastagRules
