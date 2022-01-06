import {Grid} from "@material-ui/core";
import MediaItem from "../Media/Item/item";
import moment from "moment";
import React from "react";


const PlaceholderDetails=(props)=>{
    const selectedPlaceholder=props.item;


    console.log('props placeholder = ',props);
    return(
        <Grid container direction="row">
            <Grid item xs={12}>
                <p style={{ fontSize: 20,marginLeft:10}}>
                    Placeholer
                </p>
            </Grid>
            <Grid item md={3} xs={3}>
                {<MediaItem {...props}/>}
            </Grid>
            <Grid item md={9} xs={9}>
                <p style={{fontWeight: "bold", fontSize: 20,marginLeft:'25px'}}>
                    {selectedPlaceholder.name}
                </p>
                <p style={{margin: 0,marginLeft:'15px',color: "#9a9a9a",}}>
                    FileType: 
                    <span style={{color: "#9a9a9a"}}>
                 {' '+selectedPlaceholder.media[0].file_type}
                </span>
                </p>
                <p style={{ margin: 0,marginLeft:'15px',color: "#9a9a9a",}}>
                    Uploaded On:{" "}
                    {' '+(selectedPlaceholder.created_at && selectedPlaceholder.created_at.replace(/[^\d.:-]/g, ' '))}
          
                </p>{" "}
                <p style={{ margin: 0,marginLeft:'15px',color: "#9a9a9a",}}>
                    Uploaded By:    {' '+selectedPlaceholder.media[0].owner.first_name+' '+selectedPlaceholder.media[0].owner.last_name}
                 
                </p>
                <p style={{ margin: 0,marginLeft:'15px',color: "#9a9a9a",}}>
                    File Size :  {' '+(selectedPlaceholder.media[0].size)/1000+' kb'}
                </p>
                
                
                <p style={{ margin: 0,marginLeft:'15px',color: "#9a9a9a",}}>
                Updated at :
              {' '+(selectedPlaceholder.updated_at && selectedPlaceholder.updated_at.replace(/[^\d.:-]/g, ' '))}
          
                </p>
            </Grid>
        </Grid>
    )
}

export default PlaceholderDetails;