import { useContext, useEffect, useState } from 'react';

import { BaseTweetPage } from "./BaseTweetPage";

import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/RepeatOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';

import { Avatar, Box, Divider, Card, CardHeader, Button, IconButton, CardContent, CardActions, Typography, Stack, CardMedia } from '@mui/material';

export const TweetDetailsPage = () => {

    const actions = [
        {
            name: 'Edit',
            icon: EditRoundedIcon,
            variant: 'outlined',
            onClick: () => console.log('Edit'),
        },
        {
            name: 'Save and Close',
            icon: CheckIcon,
            variant: 'outlined',
            onClick: () => console.log('Edit'),
        },
        {
            name: 'Schedule Post',
            icon: SendIcon,
            variant: 'contained',
            onClick: () => console.log('Edit'),
        }
    ]

    return (
        <BaseTweetPage
            title="Tweet Preview"
            actions={actions}
        >
            <Divider />
            <Card variant="outlined" sx={{ maxWidth: '500px', width: '100%', mt: '2%' }}>
                <CardMedia
                    component="img"
                    src='https://picsum.photos/500'
                    sx={{
                        width: '100%',
                        aspectRatio: '16/9',
                        objectFit: 'cover',
                        pointerEvents: 'none',
                        userSelect: 'none',
                        userDrag: 'none',
                    }}
                />
                <CardHeader
                    sx={{
                        '.MuiCardHeader-title': { fontWeight: 'bold', fontSize: '1.1rem' },
                        '.MuiCardHeader-subheader': { fontSize: '1rem' }
                    }}
                    avatar={
                        <Avatar>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton disabled>
                            <TwitterIcon color='primary' />
                        </IconButton>
                    }
                    title="Stacked Messenger"
                    subheader="@StackedMessenger"
                />
                <CardContent sx={{ paddingBlock: 1 }}>
                    <Typography variant="body2" color="text.primary" fontSize='1rem' gutterBottom >
                        Check us out on ESPN tonight at 7pm est!  #StackedSports
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        10:00 PM - Feb 20, 2021
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', color: "text.primary" }}>
                    <Button startIcon={<ChatBubbleIcon />} color="inherit" size='large' >
                        22
                    </Button>
                    <Button startIcon={<RepeatIcon />} color="inherit" size='large'  >
                        22
                    </Button>
                    <Button startIcon={<FavoriteIcon />} color="inherit" size='large'  >
                        22
                    </Button>
                </CardActions>
            </Card>

        </BaseTweetPage>
    )
}

export default TweetDetailsPage;
