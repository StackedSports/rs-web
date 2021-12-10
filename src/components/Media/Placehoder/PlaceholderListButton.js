import {Grid} from "@material-ui/core";
import React from "react";
import {FaSlidersH, FaBars, FaTh} from "react-icons/fa";


const PlaceholderListButton=(props)=>{
    return(
        <Grid container direction="row" justify="flex-end">
            <div
                style={{
                    border: "1px solid #d2d2d2",
                    width: 30,
                    height: 30,
                    borderRadius: 4,
                    marginRight: 30,
                    marginBottom: 10,
                }}
            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{height: 30, cursor: "pointer"}}
                    onClick={() => {
                        props.setShowlistView(!props.showlistView);
                    }}
                >
                    {props.showlistView === true ? (
                        <FaTh style={{color: "#3871DA"}}></FaTh>
                    ) : (
                        <FaBars style={{color: "#3871DA"}}></FaBars>
                    )}
                </Grid>
            </div>
        </Grid>
    )
}

export default PlaceholderListButton;