import SelectedContactItem from "../Media/Details/selected-contact";
import {Grid} from "@material-ui/core";
import React from "react";


const SelectedItemsContainer=(props)=>{
    return(
        <Grid container direction="row">
            {props.filter.length != 0 &&
            props.filter.map((fil, index) => {
                return (
                    <SelectedContactItem fil={fil} isFromHeader={true} index={index}
                                         removeDataFromFilter={props.removeDataFromFilter}/>
                );
            })}
        </Grid>
    )
}

export default SelectedItemsContainer;