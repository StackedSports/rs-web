
import React, { useState, useEffect } from "react";
import MenuNewMessage from './Menus/MenuNewMessage/MenuNewMessage'
import { Grid } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";

import Sidebar from "../common/sidebar/sidebar";
import { Divider } from "@material-ui/core";
import Content from "./Content/Content";
import { getTwitterStream } from "../../ApiHelper";



export default function TwitterStream(props) {
    




    return (
       <div>
           <Grid direction='row'>
       <Sidebar messageCreate={true} TwitterStream={true} />
       <Divider orientation='vertical' variant='fullWidth'/>
       <MenuNewMessage/>
       
           
       <Divider orientation='vertical' variant='fullWidth'/>
       </Grid>
       </div>

    );
}