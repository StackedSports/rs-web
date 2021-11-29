import React, { useState } from "react";
import { makeStyles, Grid, Checkbox, Snackbar, Badge } from "@material-ui/core";



import "emoji-mart/css/emoji-mart.css";

import { DarkContainer } from "../../../common/Elements/Elements";

import MyStreams from "./MyStreams";
import Content from "../../Content/Content";
import MenuStream from "../MenuStream/MenuStream";

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
    return (
        <div>
            <DarkContainer contacts style={{ padding: 16, marginLeft: 60 }}>
      
          
      <Grid container direction="row">
        <Grid xs={2}>
        {showSideFilters === true && (
            
          <div>
            <p
              style={{
                // padding: 5,
                fontWeight: "bold",
                fontSize: 20,
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              Create Message
            </p>
           <MyStreams/>
          
          </div>
        )}
        </Grid>
        <Grid  xs={10} style={{backgroundColor:'white'}} >
          <Grid direction='column'>
            <Grid xs={12}>
              
        <MenuStream/>
       </Grid>
       <Grid xs={12}>
         <Grid container direction='row'>
           <Grid xs={2}>
             </Grid>
             <Grid xs={8}>
             <Content/>
               </Grid>
               <Grid xs={2}>
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
