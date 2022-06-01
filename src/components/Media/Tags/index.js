import ItemMainHeader from "../Media/Header";
import {Grid} from "@mui/material";
import TagItem from "./item";
import {Fragment} from "react";
import React,{useEffect} from "react";
import {getTags} from '../../../ApiHelper'

const Tag=(props)=>{
  const[alltags,setAllTags]=React.useState([])
  useEffect(() => {

    (async () => {
     try{
        const result=await getTags();
            setAllTags(result.data);
        console.log("alltags",result)
     }catch(e){
        console.log("error",e)
     }
    })();

}, []);
    return(
        <Fragment>
            <ItemMainHeader title={"Tagged Media"} dropdown_item_title={"Last Modified"}
                            CustomToggle={props.CustomToggle}/>
            <Grid container>
                {alltags &&
                alltags.map((tag, index) => {
                    if (index < 7) {
                        return (
                            <TagItem
                                tag={tag}
                                setShowTagsDialog={props.handleShowTagsDialog}
                                setOpenSnackBar={props.handleOpenSnackBar}
                                addDataToFilter={props.addDataToFilter}

                            />
                        );
                    }
                })}
            </Grid>
        </Fragment>
    )
}

export default Tag;