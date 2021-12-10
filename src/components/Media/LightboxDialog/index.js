import {Dialog} from "@material-ui/core";
import React from "react";


const LightboxDialog=(props)=>{
    return(
        <Dialog
            open={true}
            onClose={() => {
                setLightboxVideo(null);
            }}
        >
            <video width="400" height="400" loop autoPlay controls>
                <source src={props.lightboxVideo} type="video/mp4"></source>
            </video>
        </Dialog>
    )
}

export default LightboxDialog;