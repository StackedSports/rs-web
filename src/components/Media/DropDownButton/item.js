import {Grid} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
    messagetypeGrid: {
        height: 50,
        marginLeft: 0,
        borderBottom: "2px solid #d8d8d8",
        // marginTop: -12,
        cursor: "pointer",
        color: "#3871da",
        "&>p": {
            color: "black",
        },
        "&:hover": {
            background: "#3871da",
            color: "white",
            "&>p": {
                color: "white",
            },
        },
    },
});

const DropdownItem = (props)=>{
    const classes = useStyles();
    return(
        <Grid
            container
            alignItems="center"
            className={classes.messagetypeGrid}
            style={{cursor: "pointer"}}
            onClick={() => {
                document.getElementById("toMessage").click();
            }}
        >
            <p
                style={{
                    margin: 0,
                    marginBottom: 7,
                    fontWeight: 500,
                    marginLeft: 12,
                    color: props.index > 1 ? "red" : "black",
                }}
            >
                {props.title}
            </p>
        </Grid>
    )
}


export default DropdownItem;