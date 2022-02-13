import React,{useState} from 'react'

import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

function Keyword(props) {
    const [keyword,setKeyword]=useState(false);
    
    
   
    return (
        <div  >
       
        <Paper width={300}>
            <Stack  style = {{padding:20,marginLeft:'10px',marginRight:'20px',marginBottom:0}} >
          
            <Typography variant='body2' value={10}  onClick={(e) => {
           {  props.abc(true)}
            {  props.xyz(false)}
            
            e.stopPropagation();
              }} 
              
              style = {{padding:'5px', cursor:props.countkeywordrules<=20?'pointer':"default"}}>
                 
            Keywords
            </Typography>
      {/*     <Typography variant='body2' style = {{padding:'5px',cursor:props.geographyContent===false ?'pointer':'default'}}
            onClick={(e) => {
              { props.geographyContent===false ? props.geographyRules(true):''}
              { props.geographyContent===false ? props.xyz(false):''}
              e.stopPropagation();
                }} 
            >
            Geography
            </Typography>*/}
            <Typography variant='body2' style = {{padding:'5px',cursor:props.hashtagContent === false ?'pointer':'default'}}
              onClick={(e) => {
                { props.hashtagContent ===false ? props.hashtagRules(true):''}
                { props.hashtagContent ===false ? props.xyz(false):''}
                e.stopPropagation();
                  }} 
                >
            Hashtags
            </Typography>
            <Typography variant='body2' style = {{padding:'5px',cursor:props.accountContent===false?'pointer':'default'}}
             onClick={(e) => {
              {props.accountContent ===false &&  props.accountRules(true)}
              { props.accountContent ===false &&   props.xyz(false)}
              e.stopPropagation();
                }} 
            >
            Accounts
            </Typography>
            <Typography variant='body2' disabled={true}  style = {{padding:'5px',cursor:props.checkTypes===false?'pointer':'default'}}
            onClick={(e) => {
            {props.checkTypes ===false &&  props.types(true)}
            { props.checkTypes ===false &&   props.xyz(false)}
            e.stopPropagation();
              }} 
            
            >
            <span > TweetType</span> 
            </Typography>
            </Stack>
            </Paper>

    
        </div>
    )
}

export default Keyword
