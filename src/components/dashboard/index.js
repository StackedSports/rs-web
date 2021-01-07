import React, { useState } from "react";
import Sidebar from "./sidebar/sidebar";
import Home from "./Home";
import { Modal } from "./model";
export default function Dashboard() {
  const [showModal, setShowModal] = useState(true);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <Sidebar />
      <Home />
    </>
  );
}
