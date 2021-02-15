import React, { useState } from "react";
import Sidebar from "../components/common/sidebar/sidebar";
import Media from "../components/Media";
// import { Modal } from "../model";
export default function Dashboard() {
  const [showModal, setShowModal] = useState(true);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <Sidebar contacts={true} />
      <Media contacts={true} />
    </>
  );
}
