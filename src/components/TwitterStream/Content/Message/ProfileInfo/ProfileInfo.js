import * as React from 'react';
import {Fragment} from "react";
import Typography from "@mui/material/Typography/Typography";
import Grid from "@mui/material/Grid/Grid";


export default function ProfileInfo() {
    return (
        <Fragment>
            <Typography
                style={{
                    fontWeight: 'bold',
                    fontSize: '21px',
                    marginLeft: '20px'
                }}>
                Jack Forrester</Typography>

            <Typography style={{
                fontWeight: 'bold',
                fontSize: '18px',
                marginLeft: '10px',
                color: '#c2c9d0'
            }}>
                @JackForrester</Typography>

            <Typography style={{
                fontWeight: 'bold',
                fontSize: '18px',
                marginLeft: '10px',
                color: '#c2c9d0'
            }}>
                4h</Typography>
        </Fragment>
    )
}