import React, { useState } from "react";
import { makeStyles, Grid, Checkbox, Snackbar, Badge } from "@material-ui/core";



import "emoji-mart/css/emoji-mart.css";

import { DarkContainer } from "../../../common/Elements/Elements";
import { Divider } from "@material-ui/core";
import MyStreams from "./MyStreams";
import Content from "../../Content/Content";
import MenuStream from "../MenuStream/MenuStream";
import Button from "@mui/material/Button/Button";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FilterContent from "../../Content/Message/Filter/Search/FilterContent";
import MenuNewStream from "../MenuStream/MenuNewStream";
//import useStyles from'../../../MessageCreate/index'
function MenuNewMessage() {
    const [showSideFilters, setshowSideFilters] = useState(true);
   
    
    const [addMedia, setAddMedia] = useState(false);
    const [messageDetails, setMessageDetails] = useState(null);
    const [messagePreview, setMessagePreview] = useState(null);
    const [messageSelected, setMessageSelected] = useState([]);
    const [filter, setFilter] = useState([]);
    
   
    const [ setOpenSnackBar] = React.useState(false);
    const [tagSearch, setTagSearch] = useState("")
    const [allTags, setAllTags] = useState(null);
    function disableScroll() {
      window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
      window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
      window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }
    const border ={
      position: 'absolute',
      left: '50%',
      width: '2px',
      height: '100%',
      background: 'grey',
      right: '-9px'
  }


  const handleSideFilters=()=>{
    setshowSideFilters(!showSideFilters)
  }

    return (
        <div>
            <DarkContainer contacts style={{ padding: 1, marginLeft: 60 }}>
      
          
      <Grid container direction="row">
        <Grid xs={showSideFilters?2:0} style={{display:showSideFilters?'block':'none'}}>
        
            
          <div style={{position:'sticky'}}>
            <p
              style={{
                // padding: 5,
                fontWeight: "bold",
                fontSize: 20,
                paddingBottom: 0,
                marginTop:'15px',
                marginLeft:'10px',
                marginBottom: 0,
                
              }}
            >
              Create Message
        
            </p>
           <MyStreams/>
          </div>
        </Grid>
        <Grid  xs={showSideFilters?10:12} style={{backgroundColor:'white',marginBottom:'20px'}} >
          <Grid direction='column' >
            <Grid xs={12}>
              
        <MenuStream handleSideFilters={handleSideFilters}/>
        
       </Grid>
       <Divider style={{marginLeft: '30px'}}/>
       <Grid xs={12}  >
              
              <MenuNewStream/>
              
             </Grid>
       <Divider style={{marginLeft: '30px'}}/>
      

       <Grid xs={12} >
         <Grid container direction='row' style={{height:'61vh',overflow:'scroll',position:'relative'}}>

           <Grid xs={3}  >
            <FilterContent />
            
             </Grid>
             
             <span border/>
            
             
             <Grid xs={6} >
               <Content/>
               </Grid>
               <Grid xs={3}>
                 </Grid>
      
       </Grid>
              </Grid>
       </Grid>
     
             
       
   
    </Grid>
      </Grid>
     
    
      
    </DarkContainer>
        </div>
        
    )
}
export default MenuNewMessage
