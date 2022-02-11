import React from 'react'
import { Paper, Typography } from '@mui/material'
import ClearIcon from '@material-ui/icons/Clear'
import { Stack,Grid } from '@mui/material'
function KeywordsInclude(props) {
    
    return (
        <Grid container xs={12} >
           
             { props.selectedItem.map((item,index)=>  
    
          <React.Fragment>
           <Paper
           
            style={{
                        borderRadius: 5,
                        marginLeft:props.selectedItem.length>0?'28.5px':'',
                        marginTop:'15px',
                        marginBottom:'10px',
                        color: 'black',
                        background: 'white',
                        borderColor:'#E1E1E1',
                        cursor:'default',
                      
                        
                       
                       
                        

                    }}
                   
                   
                    variant="outlined"
                    >
                         <Stack direction='column'style={{  }} >
        
                        
               

<p key={index}>
<Typography variant='body2' style={{borderRadius: 5,
   marginLeft:'15px',
   fontSize: '13px',

   fontWeight: 'bold',marginTop:'15px'
   
   }}>  
   
 Keywords: {props.tweet}; {item}
<ClearIcon onClick={(e) => {
     props.handleRemoveItem(index);
  }}

  style={{fill: '#ff1616',marginLeft:'10px',marginRight:'5px',fontSize:15,cursor:'pointer'}}/>
  </Typography>
  </p>

        </Stack>     
                    </Paper> 
 {
     index<(props.selectedItem).length-1 &&
     <Typography style={{marginTop:30,marginLeft:20}} >{props.selectedItem.length>1?props.keywordAnd:''}</Typography>
 }
</React.Fragment>
            )}
               
        </Grid>

        
        
    )
}

export default KeywordsInclude
