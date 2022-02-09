import {Checkbox, Grid} from "@material-ui/core";
import HollowWhiteButton from "../../../common/Buttons/HollowWhiteButton";
import IconTextField from "../../../common/Fields/IconTextField";
import LocalOfferOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";
import DialogBox from "../../../common/Dialogs";
import React from "react";


const TagSearchModal =(props)=>{

    const allTags=props.allTags;

    console.log('alltags = ',allTags)
    return(
        <DialogBox
            // title={"POST"}
            maxWidth="sm"
            open={props.showTagsDialog}
            message={
                <div>
                    <p
                        style={{
                            fontSize: 22,
                            color: "black",
                            marginTop: 0,
                            marginBottom: 16,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: -25,
                        }}
                    >
                        Tags
                    </p>
                    <Grid container direction="row" justify="center">
                        <input
                            type="text"
                            style={{
                                width: "100%",
                                border: "1px solid #ebebeb",
                                borderRadius: 4,
                                height: 40,
                                paddingLeft: 4,
                            }}
                            placeholder="Search Tag Name"
                            value={props.tagSearch}
                            onChange={(e) => {
                                props.setTagSearch(e.target.value);
                            }}
                        ></input>
                    </Grid>
                    <div style={{maxHeight: 400, minHeight: 400, overflow: "scroll"}}>
                        {allTags &&
                        allTags.map((tags) => {
                            if (tags.name.indexOf(props.tagSearch) > -1) {
                                return (
                                    <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{
                                            borderBottom: "1px solid #d8d8d8",
                                            paddingTop: 4,
                                            paddingBottom: 4,
                                        }}
                                    >
                                        <Grid item md={3} sm={3}>
                                            <Checkbox
                                                color="primary"
                                                onChange={() => {
                                                    // makeCheckBoxSelected(item.id);
                                                }}
                                                style={{marginTop: 1, marginBottom: 1}}
                                            ></Checkbox>
                                        </Grid>
                                        <Grid item md={9} sm={9}>
                                            {tags.name}
                                        </Grid>
                                    </Grid>
                                );
                            }
                        })}
                    </div>
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        style={{marginTop: 20, marginBottom: 5}}
                    >
                        <HollowWhiteButton
                            width={100}
                            onClick={() => {
                                props.setShowTagsDialog(false);
                            }}
                            text="Cancel"
                            textColor="#3871DA"
                            background="white"
                        ></HollowWhiteButton>
                        <IconTextField
                            width={100}
                            onClick={() => {
                                props.setShowTagsDialog(false);
                                props.setOpenSnackBar(true);
                            }}
                            text="Tag"
                            textColor="white"
                            background="#3871DA"
                            icon={
                                <LocalOfferOutlinedIcon
                                    style={{color: "white"}}
                                ></LocalOfferOutlinedIcon>
                            }
                        ></IconTextField>
                    </Grid>
                </div>
            }
            // applyForm={() => dispatch(hidePost())}
            cancelForm={() => {
                props.setShowTagsDialog(false);
            }}
            hideActions={true}
        />
    )
}

export default TagSearchModal;