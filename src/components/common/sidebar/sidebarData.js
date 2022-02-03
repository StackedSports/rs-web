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
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { IoIosSettings } from "react-icons/io";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: (
      <BiHome
        style={{
          height: "24px",
          width: "24px",
          opacity: 0.9,
        }}
        color="rgb(113, 115, 118)"
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
        color="rgb(113, 115, 118)"
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
        color="rgb(113, 115, 118)"
      />
    ),
  },
  {
    title: "Media",
    path: "/media",
    icon: (
      <TiImageOutline
        style={{ height: "24px", width: "24px", opacity: 0.9 }}
        color="rgb(113, 115, 118)"
      />
    ),
  },
  {
    title: "Publishing",

    path: "/tweet-create",
    icon: (
      <TiSocialTwitter
        style={{ height: "24px", width: "24px", opacity: 0.9 }}
        color="rgb(113, 115, 118)"
      />
    ),

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Twitter Stream",
    path: "/twitter-stream",
    icon: (
      <PublicOutlinedIcon
        style={{
          height: "24px",
          width: "24px",
          opacity: 0.9,
        }}
        color="rgb(113, 115, 118)"
      />
    ),
  },
  {
    title: "Settings",
    path: "/team-settings",
    icon: (
      <IoIosSettings
        style={{ height: "24px", width: "24px", opacity: 0.9 }}
        color="rgb(113, 115, 118)"
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
