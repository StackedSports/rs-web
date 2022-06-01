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
function GeographyRules(props) {



  
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
   
    <div style={{outline:'none'}}
    
    
    >
        <Modal  open={open} sx={{border:'none'}} 
        
        onClose={(event, reason) => {
           
           props.geographyRules(false)
            
          }}
    >
        
        
         
             <Box sx={{ ...style,outline:'none',padding:0 }}>
               <Box style={{padding:'20px'}}>
             <Stack spacing={2}>
     <Typography variant = 'subtitle1' style={{fontWeight:'bold'}}>Geo Location Rules</Typography>
     
     <FormControl   size='small' style={{width:'50%'}} >
     
      <Select
       
      className={classes.select}
      value={tweet}
      displayEmpty
      
      inputProps={{ "aria-label": "Without label" }}
      onChange={handleChange}>
        
          <MenuItem value={10} ><Typography variant = 'subtitle2' >
            Includes This Location</Typography></MenuItem>
      <MenuItem value={20}><Typography variant = 'subtitle2' >
      Exclude This Location</Typography></MenuItem>
      <MenuItem value={30}><Typography variant = 'subtitle2' >
      Exact Location match</Typography></MenuItem>
      </Select>
     </FormControl>
     <FormControl fullWidth size='small'>
     <TextField label="Enter City, State, or Zip code" type="search" fullWidth size='small' />
    </FormControl>
    <Typography variant = 'subtitle2' style={{marginLeft:'10px'}}>Nashville, TN</Typography>
    <Typography variant = 'subtitle2' style={{marginLeft:'10px'}}>Lexington, KY</Typography>
    <Typography variant = 'subtitle2' style={{marginLeft:'10px'}}>Brentwood, TN</Typography>
    
  
  
    </Stack>

    
</Box>
<Stack >


<Paper elavation={23} style={{display:'flex',marginLeft : '-1.3px',flexDirection:'row-reverse',width:'100.6%',   borderRadius: 0,}}>
<Typography variant='button' style={{marginRight:'10px',cursor:'pointer',color:'#6d6d6d',padding:'10px'}}
onClick={(e) => {
{tweet && props.geographyContent(true)}
{ tweet && props.geographyRules(false)}
e.stopPropagation();
}} >Apply</Typography>
<Typography variant='button'
style={{marginRight:'10px',cursor:'pointer',color:'#6d6d6d',padding:'10px'}}
onClick={(e) => {
   
    props.geographyRules(false)
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

export default GeographyRules
