import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { BiHome } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { BiCommentAdd } from "react-icons/bi";
import { TiImageOutline } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { BsBarChart } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: (
      <BiHome
        style={{ height: "24px", width: "24px", opacity: 0.9 }}
        color="#222222"
      />
    ),
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Contact",
    path: "/contacts",
    icon: (
      <BsPerson
        style={{ height: "24px", width: "24px", opacity: 0.9 }}
        color="#222222"
      />
    ),
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Message Create",
    path: "/message-create",
    icon: (
      <BiCommentAdd
        style={{ height: "24px", width: "24px", opacity: 0.9 }}
        color="#222222"
      />
    ),
  },
  {
    title: "Media",
    path: "/media",
    icon: (
      <TiImageOutline
        style={{ height: "24px", width: "24px", opacity: 0.9 }}
        color="#222222"
      />
    ),
  },
  {
    title: "Publishing",

    path: "/tweet-create",
    icon: (
      <TiSocialTwitter
        style={{ height: "24px", width: "24px", opacity: 0.9 }}
        color="#222222"
      />
    ),

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Reports",
    path: "/contact-profile",
    icon: (
      <BsBarChart
        style={{
          height: "24px",
          width: "24px",
          opacity: 0.9,
        }}
        color="#222222"
      />
    ),
  },
  {
    title: "Settings",
    path: "/",
    icon: (
      <IoIosSettings
        style={{ height: "24px", width: "24px", opacity: 0.9 }}
        color="#222222"
      />
    ),
  },
];

// Example item sub menu
// {
//     title: "Overview",
//     path: "/overview",
//     icon: <AiIcons.AiFillHome />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,

//     subNav: [
//       {
//         title: "Users",
//         path: "/overview/users",
//         icon: <IoIcons.IoIosPaper />,
//       },
//       {
//         title: "Revenue",
//         path: "/overview/revenue",
//         icon: <IoIcons.IoIosPaper />,
//       },
//     ],
//   },
