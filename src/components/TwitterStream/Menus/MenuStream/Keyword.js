import React,{useState} from 'react'

import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

function Keyword(props) {
    const [keyword,setKeyword]=useState(false);
    
    
   
    return (
        <div  >
       
        <Paper>
            <Stack  style = {{padding:20,marginLeft:'10px',marginRight:'20px',marginBottom:0}} >
          
            <Typography variant='body2'  value={10}  onClick={(e) => {
           {props.Types ===false  ? props.abc(true):''}
            { props.Types ===false ? props.xyz(false):''}
              }} 
              
              style = {{padding:'5px', cursor:props.Types===false ? 'pointer':'default'}}>
                 
            Keywords
            </Typography>
            <Typography variant='body2' style = {{padding:'5px',cursor:'default'}}>
            Geography
            </Typography>
            <Typography variant='body2' style = {{padding:'5px',cursor:props.Types ?'pointer':'default'}}
              onClick={(e) => {
                { props.Types ? props.hashtagRules(true):''}
                { props.Types ? props.xyz(false):''}
                  }} 
            >
            Hashtags
            </Typography>
            <Typography variant='body2' style = {{padding:'5px',cursor:'default'}}>
            Accounts
            </Typography>
            <Typography variant='body2' disabled={true}  style = {{padding:'5px',cursor:props.Types===true?'pointer':'default'}}
            onClick={(e) => {
            {props.Types &&  props.types(true)}
            { props.Types &&   props.xyz(false)}
              }} 
            
            >
            TweetTypes
            </Typography>
            </Stack>
            </Paper>

    
        </div>
    )
}

export default Keyword
