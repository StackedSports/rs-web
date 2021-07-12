import React, { useState } from "react";
import Sidebar from "../components/common/sidebar/sidebar";
import TeamSettings from "../components/TeamSettings";
// import { Modal } from "../model";
export default function Dashboard() {
  const [showModal, setShowModal] = useState(true);
  console.log(JSON.parse(localStorage.getItem("user")));

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <Sidebar />
      <TeamSettings />
    </>
  );
}
