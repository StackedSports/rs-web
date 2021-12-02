import * as React from 'react';
import Box from "@mui/material/Box/Box";
import Avatar from "@mui/material/Avatar/Avatar";
import { Divider } from '@material-ui/core';
import AvatarImg from "../../../../../images/avatar.jpeg";

export default function ProfileAvatar() {
    return (
        <Box>
            <Avatar
            src={AvatarImg}>JF</Avatar>
             <Divider orientation='vertical' variant='middle' flexitem/>
        </Box>
    )
}