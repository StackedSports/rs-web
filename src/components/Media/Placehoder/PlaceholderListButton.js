import {Grid} from "@material-ui/core";
import React from "react";
import {FaSlidersH, FaBars, FaTh} from "react-icons/fa";


const PlaceholderListButton = (props) => {
    return (

        <div
            style={{
                border: "1px solid #d2d2d2",
                width: 40,
                height: 40,
                borderRadius: 4,
                marginBottom: 10,
                float: 'right',
                marginRight: props.isPlaceholderDetails ? 10 : 0,
                marginTop: props.isPlaceholderDetails ? 10 : 0

            }}
        >
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{width: 40, height: 40, cursor: "pointer"}}
                onClick={() => {
                    if (props.isPlaceholderDetails) {
                        props.setShowlistView(!props.displayListContainer.showPlaceholderDetailsListView);
                    } else {
                        props.setShowlistView(!props.displayListContainer.showMediaListView,
                            !props.displayListContainer.showPlaceholderListView);
                    }
                }}
            >
                {props.isPlaceholderDetails ?
                    props.displayListContainer.showPlaceholderDetailsListView === true ? (
                        <FaTh style={{color: "#3871DA",}}></FaTh>
                    ) : (
                        <FaBars style={{color: "#3871DA"}}></FaBars>
                    )

                    :
                    props.displayListContainer.showMediaListView === true ? (
                        <FaTh style={{color: "#3871DA",}}></FaTh>
                    ) : (
                        <FaBars style={{color: "#3871DA"}}></FaBars>
                    )}

            </Grid>
        </div>
    )
}

export default PlaceholderListButton;