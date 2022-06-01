import * as React from 'react';
import Box from "@mui/material/Box/Box";
import Avatar from "@mui/material/Avatar/Avatar";
import { Divider } from '@mui/material';
import AvatarImg from "../../../../../images/avatar.jpeg";

export default function ProfileAvatar() {
    return (
        <Box>
            <Avatar
            src={AvatarImg}>JF</Avatar>
             
        </Box>
    )
}