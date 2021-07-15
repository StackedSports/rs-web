import React, { useState, useEffect } from "react";
import Sidebar from "../common/sidebar/sidebar";
import Home from "./Home";
import { withRouter } from "react-router";
import { Modal } from "./model";
function Dashboard(props) {
  console.log("THis props.", props.match.params);

  var userProfile;

  const [showModal, setShowModal] = useState(true);
  var [showSetting, setShowSetting] = useState(false);
  if (props.match.params.user) {
    showSetting = props.match.params.user ? true : false;
  }
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <Sidebar showSetting={showSetting} setShowSetting={setShowSetting} />
      <Home showSetting={showSetting} setShowSetting={setShowSetting} />
    </>
  );
}
export default withRouter(Dashboard);
