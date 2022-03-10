import React, { useState } from "react";
import Sidebar from "../components/common/sidebar/sidebar";
import UserProfile from "../components/UserProfile";
// import { Modal } from "../model";
export default function Dashboard(props) {
  const [showModal, setShowModal] = useState(true);
  console.log(JSON.parse(localStorage.getItem("user")));

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <Sidebar contacts={true} />
      <UserProfile contacts={true} {...props}/>
    </>
  );
}
