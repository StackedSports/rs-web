import React, { useContext, useEffect, useState } from 'react';

import { BaseTweetPage } from "./BaseTweetPage";
import ErrorPanel from 'UI/Layouts/ErrorPanel'

import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/RepeatOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Avatar, Divider, Card, CardHeader, Button, IconButton, CardContent, CardActions, Typography, CardMedia, Skeleton, TextField, InputBase } from '@mui/material';

import { RouteComponentProps } from 'react-router-dom';
import { useTweet } from 'Api/ReactQuery';
import RenderIf from 'UI/Widgets/RenderIf';
import { getNiceDate } from 'utils/Parser';

interface TweetDetailsPageProps extends RouteComponentProps<{ id: string }> { }

export const TweetDetailsPage: React.FC<TweetDetailsPageProps> = (props) => {

    const tweet = useTweet(props.match.params.id)

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
            <RenderIf condition={tweet.isError}>
                <ErrorPanel
                    title={`${tweet.error?.response?.status} ${tweet.error?.response?.statusText}`}
                    body={tweet.error?.response?.data?.errors[0]?.message}
                />
            </RenderIf>

            <RenderIf condition={tweet.item || tweet.loading}>
                <Card variant="outlined" sx={{ maxWidth: '500px', width: '100%', mt: '2%' }}>
                    <CardMedia
                        component={tweet.loading ? Skeleton : "img"}
                        src={tweet.item && tweet.item.media?.[0].urls.large}
                        sx={{
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
                        title={tweet.loading ? <Skeleton /> : tweet.item && tweet.item.queued_by}
                        subheader={tweet.item && tweet.item.twitter}

                    />
                    <CardContent sx={{ paddingBlock: 1 }}>
                        <InputBase
                            fullWidth
                            multiline
                            readOnly
                            sx={{ fontSize: '1.1rem', color: 'text.primary', pb: 1 }}
                            value={tweet.loading ? <Skeleton /> : tweet.item && tweet.item?.body || ''}
                        />

                        <Typography variant="body2" color="text.secondary" >
                            {tweet.loading ? <Skeleton /> : tweet.item && getNiceDate(new Date(tweet.item.send_at))}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between', color: "text.primary" }}>
                        <Button startIcon={<ChatBubbleIcon />} color="inherit" size='large' >
                            ?
                        </Button>
                        <Button startIcon={<RepeatIcon />} color="inherit" size='large'  >
                            ?
                        </Button>
                        <Button startIcon={<FavoriteIcon />} color="inherit" size='large'  >
                            ?
                        </Button>
                    </CardActions>
                </Card>
            </RenderIf>
        </BaseTweetPage>
    )
}

export default TweetDetailsPage;
