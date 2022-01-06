
import React, { useState, useEffect } from "react";
import MenuNewMessage from './Menus/MenuNewMessage/MenuNewMessage'
import { Grid } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";

import Sidebar from "../common/sidebar/sidebar";
import { Divider } from "@material-ui/core";
import Content from "./Content/Content";
import { getTwitterStream } from "../../ApiHelper";
import MenuStream from "./Menus/MenuStream/Menu/MenuStream";
import Contacts from "../../components/Chat/Chat"

export default function TwitterStream(props) {
    
    const [message, setMessage] = useState(false);
    const [showTwitterStream, setTwitterStream] = useState(true);
    const handleMessage=(message)=>{
        setMessage(message)
      }
      const handleTwitterStream=(twitter)=>{
        setTwitterStream(twitter)
      }

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
       <Sidebar messageCreate={message? false : true} TwitterStream={message? false : true}
        chat={message? true : false}/>
        {message && <Contacts message={handleMessage} />}
       <Divider />
   <MenuNewMessage  message={handleMessage} />
       
            
    
       </Grid>
       </div>

    );
}