import {Grid} from "@material-ui/core";
import React from "react";


const ItemContainer=(props)=>{
        return (
            <Grid
                container
                direction="row"
                alignItems="center"
                style={{
                    border: props.border || "1px solid #d8d8d8",
                    width: props.width || "max-content",
                    background: props.background || "white",
                    height: 40,
                    borderRadius: 4,
                    marginLeft: props.marginLeft != null ? props.marginLeft : 16,
                    marginTop: props.marginTop || 0,
                    marginBottom: props.marginBottom || 0,
                    cursor: "pointer",
                    paddingLeft: 20,
                    paddingRight: 20,
                }}
                onClick={() => {
                    if (props.onClick) {
                        props.onClick();
                    }
                }}
                onMouseEnter={() => {
                    if (props.onMouseEnter) {
                        props.onMouseEnter();
                    }
                }}
                onMouseLeave={() => {
                    if (props.onMouseLeave) {
                        props.onMouseLeave();
                    }
                }}
            >
                <Grid item md={12} sm={12} direction="row">
                    <div style={{display: "flex"}}>
                        {props.icon && <span> {props.icon}</span>}
                        <span
                            id={props.id}
                            style={{
                                fontWeight: "bold",
                                color: props.textColor || "black",
                                overflowText: "ellipsis",
                                marginLeft: 10,
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                            }}
                        >
              {props.text}
            </span>
                    </div>
                </Grid>
            </Grid>
        );
}

export default ItemContainer;