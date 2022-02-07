import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: (
      <HomeOutlinedIcon
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
      <PersonOutlineOutlinedIcon
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
      <AddCommentOutlinedIcon
        style={{ height: "24px", width: "24px", opacity: 0.9 }}
        color="rgb(113, 115, 118)"
      />
    ),
  },
  {
    title: "Media",
    path: "/media",
    icon: (
      <ImageOutlinedIcon
        style={{ height: "24px", width: "24px", opacity: 0.9 }}
        color="rgb(113, 115, 118)"
      />
    ),
  },
  {
    title: "Publishing",

    path: "/tweet-create",
    icon: (
      <TwitterIcon
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
      <SettingsIcon
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
