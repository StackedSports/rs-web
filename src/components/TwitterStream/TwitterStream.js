
import React, { useState, useEffect } from "react";
import MenuNewMessage from './Menus/MenuNewMessage/MenuNewMessage'
import { Grid } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";

import Sidebar from "../common/sidebar/sidebar";
import { Divider } from "@material-ui/core";
import Content from "./Content/Content";
import { getMessage } from "../../ApiHelper";
import MenuStream from "./Menus/MenuStream/MenuStream";


export default function TwitterStream(props) {


    useEffect(async () => {
        try{
            const result=await getMessage();
            console.log('result = ',result)
        }catch (e) {
            console.log('error = ',e)
        }
    });

    return (
       <div>
           <Grid direction='row'>
       <Sidebar messageCreate={true} TwitterStream={true} />
       <Divider />
       <MenuNewMessage MenuStream={true}/>
       
           
    
       </Grid>
       </div>

    );
}