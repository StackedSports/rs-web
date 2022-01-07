import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { Typography } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Paper } from '@mui/material';

function KeywordRules(props) {
 


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
      const [keyword, setKeyword] = React.useState(null);
      const [circleIcon, setCircleIcon] = React.useState(false);
      const [begin,setbegin]= React.useState(false);
      const [keyworddisable,setKeywordDisable] =  React.useState(false);
      const handleChange = (event) => {
        setTweet(event.target.value);
        event.target.value===30?setKeywordDisable(true):'';
      };
      console.log('setkeywordDisable : ',keyworddisable)
      const handleChangeKeyword = (event) => {
        setKeyword(event.target.value);
        
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
      const handleClick = () => {
        console.info('You clicked the Chip.');
      };
      const classes = useStyles();
      console.log({tweet})
      
    return (
        
        <div style={{outline:'none'}}>
            <Modal  open={open} sx={{border:'none'}}
             onClose={(event, reason) => {
           
              props.xyz(false)
               
             }}
            
            
            >
             
                 <Box sx={{ ...style,outline:'none',padding:0 }}>
                   <Box style={{padding:'20px'}}>
                 <Stack spacing={2}>
         <Typography variant = 'subtitle1' style={{fontWeight:'bold'}}>Keywords</Typography>
         
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
         <FormControl   size='small' style={{width:'50%'}} >
         
          <Select
           
          className={classes.select}
          value={keyword}
          displayEmpty
            
             disabled={keyworddisable}
          inputProps={{ "aria-label": "Without label" }}
          onChange={handleChangeKeyword}>
            
              <MenuItem value={10} ><Typography variant = 'subtitle2' >
                  Keyword And Keyword</Typography></MenuItem>
          <MenuItem value={20}><Typography variant = 'subtitle2' >
          Keyword OR Keyword</Typography></MenuItem>
         
          </Select>
         </FormControl>
         <FormControl fullWidth size='small'>
         <TextField label="Search or Create New keyword Match" type="search" fullWidth size='small' />
        </FormControl>
        <Typography variant = 'subtitle2' style={{fontWeight:'bold',marginLeft:'10px'}}>Keyword Set - Tickets </Typography>
        <Typography variant = 'subtitle2' style={{fontWeight:'bold',marginLeft:'10px'}}>Keyword Set - Recruitig</Typography>
        
        <Stack direction='row' spacing={1} >
         
        <Chip
        label="Season Tickets"
        className={classes.icon}
        onClick={(e) => {
          setCircleIcon(true)
        handleClick
        }}
        
       
      
        style={{borderRadius:'5px',width:'34%',backgroundColor:circleIcon ?'white':'#f0f0f0',padding:0}}
        
      />
    
     { circleIcon && 
       <CheckCircleIcon fontSize='small' style={{fill:'#006644',marginTop:'5px'}}/>
}</Stack>  
      
        </Stack>

        
   </Box>
   <Stack >

   <Typography variant = 'subtitle2' style={{marginLeft:'30px',marginBottom:'-14px'}}>Keyword Set - Recruitig</Typography>
    
   <Paper elavation={24} style={{display:'flex',marginLeft : '-1.3px',flexDirection:'row-reverse',width:'100.6%',   borderRadius: 0,}}>
 <Typography variant='button' style={{marginRight:'10px',cursor:'pointer',color:'#6d6d6d',padding:'10px'}}
 onClick={(e) => {
   {circleIcon && tweet && props.include(true)}
  {circleIcon && tweet && props.xyz(false)}
  e.stopPropagation();
 }} >Apply</Typography>
 <Typography variant='button'
  style={{marginRight:'10px',cursor:'pointer',color:'#6d6d6d',padding:'10px'}}
  onClick={(e) => {
   
 props.xyz(false)
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

export default KeywordRules
