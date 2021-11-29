
import React, { useState, useEffect } from "react";
import MenuNewMessage from './Menus/MenuNewMessage/MenuNewMessage'
import { Grid } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";

import Sidebar from "../common/sidebar/sidebar";
import { Divider } from "@material-ui/core";
import Content from "./Content/Content";
export default function TwitterStream(props) {
    var userProfile;

  const [showModal, setShowModal] = useState(true);
  var [showSetting, setShowSetting] = useState(false);
  if (props.match.params.user) {
    showSetting = props.match.params.user ? true : false;
  }
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
;
  const [allTags, setAllTags] = useState(null);

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