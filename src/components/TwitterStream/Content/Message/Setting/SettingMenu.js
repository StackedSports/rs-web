import React from 'react'
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
function SettingMenu(props) {
    return (
        <div  >
       
        <Paper>
            <Stack  style = {{padding:7,marginBottom:0,width:'12vw'}} >
          
            <Typography variant='body2' onClick={(e) => {
            props.tagMenu(true)
            props.tags(false)
         
              }} 
              
              style = {{padding:'5px', cursor:"pointer"}}>
                 
            Tags
            </Typography>
            <Typography variant='body2' style = {{padding:'5px',cursor:props.geographyContent===false ?'pointer':'default'}}
            onClick={(e) => {
            
                }} 
            >
            View on Twitter
            </Typography>
            <Typography variant='body2' style = {{padding:'5px',cursor:'pointer'}}
              onClick={(e) => {
                props.message(true)
                props.tags(false)
                  }} 
            >
            Send New Message
            </Typography>
            <Typography variant='body2' style = {{padding:'5px',cursor:props.accountContent===false?'pointer':'default'}}
             onClick={(e) => {
              props.tags(false)
                }} 
            >
            Mark Complete
            </Typography>
           
            </Stack>
            </Paper>

    
        </div>
    )
}

export default SettingMenu
