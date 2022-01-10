import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Stack from '@mui/material/Stack';
import Keyword from './Keyword';
import {Typography } from '@mui/material'
function MenuNewStream(props) {
  
      
  
    return (
        <Box style={{  padding: 15,position:'relative'}} 
        
        >
            <Stack direction='row' spacing={13.5}>
            <div>
            <Button
  disabled ={props.checkTypes && props.tweetTypes && props.hashtagContent && props.accountContent &&
    props.geographyContent ===true }

            onClick={(e) => {
               props.setKeyword(true)
             
               props.streambutton(true)
               e.stopPropagation();
              }}
              
                    style={{
                        borderRadius: 5,
                        marginLeft:'15px',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: 'black',
                        background: 'white',
                        
                        borderColor:'#E1E1E1'
                    
                    }}
                    
                    
                    variant="outlined"
                    
                    endIcon={<AddIcon sx={{fontSize: 25}} style={{fill: 'black'}}
                    />}>
                    <Typography variant='button' style={{fontWeight:'bold'}}>     New</Typography>
                   </Button >
                   </div>

                   <div style = {{position:'absolute',bottom:'0px',top:'15px',zIndex:'100'}}>

                   {props.keyword && <Keyword abc={props.xyz} xyz={props.setKeyword} Types={props.tweetTypes} 
                   types={props.tweet} hashtagRules={props.hashtagRules}
                    geographyRules={props.geographyRules} geographyContent={props.geographyContent}
                    checkTypes={props.checkTypes}  hashtagContent={props.hashtagContent} 
                    accountRules={props.accountRules} accountContent={props.accountContent} />}

                    </div>
                    </Stack>
       </Box>

    )
}

export default MenuNewStream
