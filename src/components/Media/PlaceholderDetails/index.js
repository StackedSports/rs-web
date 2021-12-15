import {Grid} from "@material-ui/core";
import MediaItem from "../Media/Item/item";
import moment from "moment";
import React from "react";


const PlaceholderDetails=(props)=>{
    const selectedPlaceholder=props.item;


    console.log('props placeholder = ',props);
    return(
        <Grid container direction="row">
            <Grid item md={3} xs={3}>
                {<MediaItem {...props}/>}
            </Grid>
            <Grid item md={9} xs={9}>
                <p style={{fontWeight: "bold", fontSize: 20}}>
                    {selectedPlaceholder.name}
                </p>
                <p style={{fontWeight: 500, fontSize: 20, margin: 0}}>
                    FileType: image/jpeg
                </p>
                <p style={{fontWeight: 500, fontSize: 20, margin: 0}}>
                    Uploaded On:{" "}
                    {new moment(selectedPlaceholder.created_at).format(
                        "YYYY-MM-DD"
                    )}
                </p>{" "}
                <p style={{fontWeight: 500, fontSize: 20, margin: 0}}>
                    Uploaded By: Tim Glover
                </p>
                <p style={{fontWeight: 500, fontSize: 20, margin: 0}}>
                    File Size : 40.5 kb
                </p>
                <p style={{fontWeight: 500, fontSize: 20, margin: 0}}>
                    Dimensions : 160 x 200
                </p>
                <p style={{fontWeight: 500, fontSize: 20, margin: 0}}>
                    Last Sent :{" "}
                    {new moment(selectedPlaceholder.created_at).format(
                        "YYYY-MM-DD"
                    )}
                </p>
            </Grid>
        </Grid>
    )
}

export default PlaceholderDetails;