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
import Autocomplete from '@mui/material/Autocomplete';
import { Paper } from '@mui/material';
import { FaStackpath } from 'react-icons/fa';


function KeywordRules(props) {
 const [item,setItem]=React.useState(null)

  const top100Films = [
    { title: 'Keyword Set - Tickets' },
    { title: ' Keyword Set - Recruitig'},
    { title: 'Keyword Set - Season ' },
    { title: 'Keyword Set - Twitter'},
    { title: 'Keyword Set - Stream' },
    { title: "Keyword Set - Filter"},
    { title: 'Keyword Set - Season'},
    {
      title: 'Keyword Set - Tickets'
    }
  
  ];

  const [selectedItem,setSelecteditem]=React.useState([])
  const [count,setCount]=React.useState(0)

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
      const [keyworddisable,setKeywordDisable] =  React.useState(true);
      const handleChange = (event) => {
        setTweet(event.target.value);
        event.target.value===30?setKeywordDisable(true):setKeywordDisable(false);
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
          border:'2.3px solid #1976d2' ,
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
      console.log('selectedItems = ',selectedItem)
      
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
           
          
          value={keyword}
          displayEmpty
          style={{
         border:keyworddisable?'2.3px solid #e1e1e1 ':'2px solid #1976d2',
         borderRadius: "5px 5px 0 0"
        }}
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
         <Autocomplete
        id="free-solo-demo"
        multiple
        options={top100Films.map((option) => option.title)}
        onChange={(event,values) => {
          console.log('hamza',selectedItem)
        
          selectedItem.push(values)
          setSelecteditem(values);
          setCount(count+1)
         
        }}
        renderInput={(params) => <TextField {...params} label="Search or Create New Keyword Match" />}
      /> </FormControl>
        
        {
          selectedItem.map((item)=>         
          <Typography variant = 'subtitle2' style={{fontWeight:'bold',marginLeft:'10px'}}>
          {item}
         </Typography>
         
          )
        }
           
         
         
       

        <Stack direction='row' spacing={1} >
         
        <Chip
        label="Season Tickets"
        className={classes.icon}
        onClick={(e) => {
          setCircleIcon(!circleIcon)
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
