import {Dialog} from "@mui/material";
import React from "react";


const LightboxDialog=(props)=>{

    console.log('showing dialog = ',props)
    return(
        <Dialog
            open={true}
            onClose={() => {
                props.closeModal(null);
            }}
        >
            {
             props.isVideo?
                 <video width="400" height="400" loop autoPlay controls>
                     <source src={props.url} type="video/mp4"></source>
                 </video>
                 :
                 <img loop  src={props.url}/>
            }
        </Dialog>
    )
}

export default LightboxDialog;