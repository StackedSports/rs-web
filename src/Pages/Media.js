import React, { useState } from "react";

import Sidebar from "../components/common/sidebar/sidebar";
import Media from "../components/Media";
// import { Modal } from "../model";
import { withRouter } from "react-router-dom";

function MediaPage(props) {
  const [showModal, setShowModal] = useState(true);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <Sidebar media={true} history={props.history}/>
      <Media contacts={true} media={true} history={props.history} />
    </>
  );
}

export default withRouter(MediaPage);
