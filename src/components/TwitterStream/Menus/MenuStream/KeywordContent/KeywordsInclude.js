import React from 'react'
import { Paper, Typography } from '@mui/material'
import ClearIcon from '@material-ui/icons/Clear'
import { Stack } from '@mui/material'
function KeywordsInclude(props) {
    
    return (
        <Stack direction='row'>
          
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
                         <Stack direction='column' spacing={1} style={{  height:props.selectedItem.length>0?35:0,
                        width:"",overflowY:props.selectedItem.length>0?"scroll":"hidden",overFlowX:'hidden'}} >
        
                        
                  { props.selectedItem.map((item,index)=>  

<p key={index}>
<Typography variant='body2' style={{borderRadius: 5,
   marginLeft:'15px',
   fontSize: '13px',
   fontWeight: 'bold',marginTop:'7px'
   
   }}>  
   
 Keywords: {props.tweet}; {item}
<ClearIcon onClick={(e) => {
     var array =props.selectedItem;
  
     console.log("remove keyword content ",props.keywordIncludes)
     if (props.selectedItem.length>0) {
        array.splice(index, 1);
        props.handleSelectedItem(array)
       
      }else {
          props.handleKeywordIncludes(false)
          
     console.log("remove keyword includes ",props.KeywordsInclude)
      }

  }}

  style={{fill: '#ff1616',marginLeft:'10px',marginRight:'5px',fontSize:15,cursor:'pointer'}}/>
  </Typography>
  </p>
)}
        </Stack>               
                    </Paper>
                    <Typography style={{marginTop:20,marginLeft:20}} >{props.countkeywordrules>1?props.keywordAnd:''}</Typography>
           
        </Stack>

        
        
    )
}

export default KeywordsInclude
