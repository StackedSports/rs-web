import ItemMainHeader from "../Media/Header";
import {Grid} from "@material-ui/core";
import TagItem from "./item";
import {Fragment} from "react";
import React from "react";


const Tag=(props)=>{
    const taggedMedia=props.taggedMedia;
    return(
        <Fragment>
            <ItemMainHeader title={"Tagged Media"} dropdown_item_title={"Last Modified"}
                            CustomToggle={props.CustomToggle}/>
            <Grid container>
                {taggedMedia &&
                taggedMedia.map((tag, index) => {
                    if (index < 7) {
                        return (
                            <TagItem
                                tag={tag}
                                setShowTagsDialog={props.handleShowTagsDialog}
                                setOpenSnackBar={props.handleOpenSnackBar}
                            />
                        );
                    }
                })}
            </Grid>
        </Fragment>
    )
}

export default Tag;