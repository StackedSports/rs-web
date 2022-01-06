import * as React from 'react';
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Grid from "@mui/material/Grid/Grid";

import { Divider } from "@material-ui/core";
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import TuneIcon from '@mui/icons-material/Tune';
import AccountCircle from "@mui/material/SvgIcon/SvgIcon";
import IconButton from "@mui/material/IconButton/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { useStyles } from '../../../../MessageCreate';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import Paper from '@material-ui/core/Paper';
import StarIcon from '@mui/icons-material/Star';
export default function MenuStream(props) {

    const [newButton,setNewButton] = useState(false);
    const [actionButton,setActionButton] = useState(true);
    const [clearIcon, setClearIcon] = useState(false);
    const [streamButton,setStreamButton]=useState(false);
 
    console.log("hidegrid ", props.streamButtonColor)
    return (
       <div >
            {props.mediaDashboard === true ? (

<div>
<Grid container direction="row" alignItems="center"
         
         style={{marginLeft: '20px', marginTop: '20px', padding: 10}}>
              
       <IconButton
           size="medium"
           aria-label="account of current user"
           aria-controls="primary-search-account-menu"
           aria-haspopup="true"
           color="inherit"
       >
           <FormatAlignLeftIcon sx={{fontSize: 27}} style={{fill: '#000'}} onClick={(e) => {
                     props.handleSideFilters();
                   }}/>

         
       </IconButton>
       <Typography style={{fontWeight: 'bold', fontSize: '15px', marginLeft: '20px'}}>
           Media
           </Typography>
           
           
       <Box sx={{flexGrow: 0.9}}>
       </Box>

       <Box>
           <Button
               style={{
                   borderRadius: 5,
                   padding: 10,
                   fontSize: '13px',
                   fontWeight: 'bold',
                   color: 'black',
                   background: 'white',
               }}
               variant="outlined"
               endIcon={<AutoFixHighIcon sx={{fontSize: 25}} style={{fill: '#3871da'}}/>}>
               Action</Button>

           <Button
               style={{
                   borderRadius: 5,
                   padding: 10,
                   marginLeft: 10,
                   fontSize: '13px',
                   fontWeight: 'bold',
                   color: 'black',
                   background: 'white',
               }}
               variant="outlined"
               endIcon={<LocalOfferOutlinedIcon sx={{fontSize: 40}} style={{fill: '#3871da'}}/>}>
               Tag</Button>
       </Box>
      
   </Grid>

</div>
):(
         
        <Grid container direction="row" alignItems="center"
         
              style={{marginLeft: '20px', marginTop: '20px', padding: 10}}>
                   
            <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
            >
                <FormatAlignLeftIcon sx={{fontSize: 27}} style={{fill: '#000'}} onClick={(e) => {
                          props.handleSideFilters();
                        }}/>

              
            </IconButton>
         <Typography style={{fontWeight: 'bold', fontSize: '15px', marginLeft: '20px'}}>Twitter
                Stream</Typography>
              { props.menu && <Divider orientation="vertical" variant="middle" flexItem />
               } 
               { 
               props.menu  &&<Typography marginLeft='5px' variant='subtitle1' fontWeight='bold' >
                     Filter : 
                 </Typography> }
               {props.menu && <Paper
                    style={{
                        borderRadius: 5,
                        marginLeft:'28.5px',
                        marginTop:'15px',
                        marginBottom:'10px',
                        color: 'black',
                        background: 'white',
                        borderColor:'#E1E1E1',
                        cursor:'default',
                        height:35,
                        

                    }}
                   
                    variant="outlined"
                    >
                     <Typography style={{marginLeft:'10px',marginTop:'8px',
                     fontSize:'12px', fontWeight: 'bold'}}> 
                       Season Tickets '21
                     <ClearIcon onClick={(e) => {

                         props.criteria(false)
                       props.seasonTicket(false)
         
        }} sx={{fontSize: 17,cursor:'pointer'}} style={{fill: 'red',marginLeft:'10px'}}/></Typography>
                       
                    </Paper>}
            <Box sx={{flexGrow: 0.9}}>
            </Box>

            <Box>
              {
       props.streambutton===false  ?(
              <Button
              disabled
                    style={{
                        borderRadius: 5,
                        marginLeft:'15px',
                        fontSize: '13px',
                        fontWeight:"bold",
                        color: 'black',
                        background: 'white',
                        borderColor:'#E1E1E1'
                    }}
                   

                    variant="outlined"
                    endIcon={<AutoFixHighIcon fontSize= "small" style={{fill: '#3871da',fontSize:17}}/>}>
                    Action</Button>

            
       ):
                       (<Button
                         
                            onClick={(e) => {
                                props.streamName(true)
                                setStreamButton(true)   
                                props.setStreamButtonColor(true)                 
                               }}
                    style={{
                        borderRadius: 5,
                        marginLeft:'15px',
                        fontSize: '13px',
                        fontWeight:"bold",
                        color: streamButton && props.streamButtonColor===true ? 'white' :'black',
                        background:  streamButton && props.streamButtonColor===true ?  '#3871da': 'white',
                        borderColor:'#E1E1E1',
                        textTransform:"none"
                       
                    }}
                    
                    variant="outlined"
                    endIcon={<StarIcon fontSize='small' 
                    style={{fill:streamButton && props.streamButtonColor===true  ? 'white' :'#3871da',fontSize:17}}/>}>
                    Save as a Stream</Button>
                       )}
                <Button
                    style={{
                        borderRadius: 5,
                        marginLeft:'15px',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: props.button? 'black':'white',
                        
                        background :props.button ? 'white' : '#007aff',
                        borderColor:'#E1E1E1',
                       
                        
                    }}
                    
                    onClick={(e) => {
                       props.showNew(); 
                       props.actionbutton() 
                       
                                   
                      }}
                      disabled={props.menu}
                    variant="outlined"
                    endIcon={<TuneIcon sx={{fontSize: 40}} style={{fill: props.button ? '#3871da':'white'}}/>}>
                    Filter </Button>
            </Box>
           
        </Grid>
)}
        </div>
    );
}