import {Fragment} from "react";
import ItemMainHeader from "../Media/Header";
import PlaceholderTableList from "../Media/TableList/index";
import {Grid} from "@material-ui/core";
import MediaItem from "../Media/Item/item";
import React from "react";
import PlaceholderItem from "../Media/TableList/item";


const Placeholder = (props) => {
    console.log('placeholders = ', props.placeholders)

    let placeholders = null;
    if (props.showlistView && props.placeholders) {
        placeholders = (props.placeholders).filter((item) => item.name)
            .map((item) => {
                return {
                    ...item, name: item.name,
                    url: item.media && item.media.length && item.media[0].urls['thumb'],
                    media_preview:item.media && item.media.length && item.media[0].urls['original'],
                    date: item.created_at,
                    id: item.id,
                    type: 'placeholder'
                }
            });
    } else {
        placeholders = props.placeholders;
        if (placeholders)
            placeholders = placeholders.map((placeholder) => {
                placeholder.type = "placeholder";
                return placeholder;
            })
    }
    console.log('placeholders = ', props.showlistView)


    return (
        <Fragment>
            <ItemMainHeader title={"Placeholders"} dropdown_item_title={"Last Modified"}
                            CustomToggle={props.CustomToggle}/>
            {props.showlistView === true && props.message === null ? (
                    <PlaceholderTableList
                        list={placeholders}
                        handleScroll={props.handleScroll}
                        isPlaceholder={true}
                        setLightboxVideo={props.setLightboxVideo}
                        setLightboxPicture={props.setLightboxPicture}
                        setSelectedPlaceHolder={props.setSelectedPlaceHolderListView}/>
                ) :
                (
                    <Grid container>
                        {placeholders ? (
                            placeholders.map((m, index) => {
                                if (props.viewMorePlaceholder) {
                                    if (index < props.placeholderEndIndex) {
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
                                <div class="spinner-border text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
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
                              if (props.placeholderEndIndex >= 20) {
                                  props.setViewMorePlaceholder(true);
                                  props.setPlaceholderEndIndex(props.placeholderEndIndex - 15);
                              } else if (props.placeholderEndIndex >= 4) {
                                  props.setViewMorePlaceholder(false);
                                  props.setPlaceholderEndIndex(props.placeholderEndIndex - 4);
                              }
                          }}
                      >
                        {props.viewMorePlaceholder == true ? "View Less" : ""}
                      </span>
                                <span
                                    style={{
                                        color: "#3871DA",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        // setViewMorePlaceholder(!viewMorePlaceholder);
                                        if (props.placeholderEndIndex >= placeholders.length) {
                                            props.setViewMorePlaceholder(false);
                                            props.setPlaceholderStartIndex(0);
                                            props.setPlaceholderEndIndex(15);
                                        } else {
                                            props.setViewMorePlaceholder(true);
                                            props.setPlaceholderStartIndex(props.placeholderEndIndex);
                                            props.setPlaceholderEndIndex(props.placeholderEndIndex + 15);
                                        }
                                    }}
                                >
                        {props.viewMorePlaceholder == true &&
                        props.placeholderEndIndex >= placeholders.length
                            ? ""
                            : "Load More"}
                      </span>
                            </Grid>
                        </div>
                    </Grid>
                )}
        </Fragment>
    )
}

export default Placeholder;