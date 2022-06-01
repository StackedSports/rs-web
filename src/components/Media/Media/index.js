import ItemMainHeader from "./Header";
import {Grid} from "@mui/material";
import MediaItem from "./Item/item";
import moment from "moment";
import PlaceholderTableList from "./TableList/index";
import TagItem from "../Tags/item";
import React, {Fragment} from "react";


const Media = (props) => {

    const media = props.media;
    //console.log('media list  = ',props)
    return (
        <Fragment>
            { !props.isPlaceholderDetails &&
                <ItemMainHeader title={"Quick Access"} dropdown_item_title={"Last Modified"}
                            CustomToggle={props.CustomToggle}/>}

            {props.selectedPlaceholder === null || props.message || props.isPlaceholderDetails ? (
                <Grid container>
                    {media != null ? (
                        media.map((m, index) => {
                            if (props.viewMoreQuickAccess) {
                                console.log('props.quickAccessEndIndex')
                                if (
                                    // index >= quickAccessStartIndex &&
                                    index < props.quickAccessEndIndex
                                ) {
                                    return <MediaItem {...props} item={m}/>;
                                }
                            } else {
                                if (index < 4) {
                                    return <MediaItem {...props} item={m}/>;
                                }
                            }
                        })
                    ) : (
                        <Grid container direction="row" justify="center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </Grid>
                    )}
                    <div style={{width: "100%"}}>
                        <Grid container direction="row" justify="center">
                      <span
                          style={{
                              color: "#3871DA",
                              fontWeight: 600,
                              cursor: "pointer",
                              marginRight: 10,
                          }}
                          onClick={() => {
                              if (props.quickAccessEndIndex >= 20) {
                                  props.setViewMoreQuickAccess(true);
                                  props.setQuickAccessEndIndex(props.quickAccessEndIndex - 15);
                              } else if (props.quickAccessEndIndex >= 4) {
                                  props.setViewMoreQuickAccess(false);
                                  props.setQuickAccessEndIndex(props.quickAccessEndIndex - 4);
                              }
                          }}
                      >
                        {props.viewMoreQuickAccess == true ? "View Less" : ""}
                      </span>
                            <span
                                style={{
                                    color: "#3871DA",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    if (props.quickAccessEndIndex >= media.length) {
                                        props.setViewMoreQuickAccess(true);
                                        props.setQuickAccessStartIndex(0);
                                        props.setQuickAccessEndIndex(15);
                                    } else {
                                        props.setViewMoreQuickAccess(true);
                                        props.setQuickAccessStartIndex(props.quickAccessEndIndex);
                                        props.setQuickAccessEndIndex(props.quickAccessEndIndex + 15);
                                    }
                                }}
                            >
                        {props.viewMoreQuickAccess == true &&
                        props.quickAccessEndIndex >= media.length
                            ? ""
                            : "Load More"}
                      </span>
                        </Grid>
                    </div>
                </Grid>
            ) : ''
            }
        </Fragment>
    )
}


export default Media;