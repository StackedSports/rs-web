import React from 'react'
import { Avatar, AvatarGroup, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, InputBase, Skeleton, Typography } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/RepeatOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { getNiceDate } from 'utils/Parser';
import { ITweet } from 'Interfaces';

export const TweetPost = ({ tweet, loading = false }: { tweet?: ITweet, loading: boolean }) => {
    return (
        <Card variant="outlined" sx={{ maxWidth: '500px', width: '100%' }}>
            {tweet && tweet.media.length > 0 && (
                <CardMedia
                    component={loading ? Skeleton : "img"}
                    src={tweet && tweet.media?.[0].urls.large}
                    sx={{
                        aspectRatio: '16/9',
                        objectFit: 'cover',
                        pointerEvents: 'none',
                        userSelect: 'none',
                        userDrag: 'none',
                    }}
                />
            )}
            <CardHeader
                sx={{
                    '.MuiCardHeader-title': { fontWeight: 'bold', fontSize: '1.1rem' },
                    '.MuiCardHeader-subheader': { fontSize: '1rem' }
                }}
                avatar={
                    <AvatarGroup max={2}>
                        {
                            (tweet && tweet.posted_as_avatar.length > 0) ?
                                tweet?.posted_as_avatar.map(src => <Avatar alt="Remy Sharp" src={src} key={src} />) :
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                        }
                    </AvatarGroup>
                }
                action={
                    <IconButton disabled>
                        <TwitterIcon color='primary' />
                    </IconButton>
                }
                title={loading ? <Skeleton /> : tweet?.posted_as}
                subheader={tweet?.twitter}

            />
            <CardContent sx={{ paddingBlock: 1 }}>
                {loading ? (
                    <Skeleton variant='rectangular' height={'200px'} />
                ) : (
                    <InputBase
                        fullWidth
                        multiline
                        readOnly
                        sx={{ fontSize: '1.1rem', color: 'text.primary', pb: 1 }}
                        value={tweet && tweet?.body || ''}
                    />
                )}


                <Typography variant="body2" color="text.secondary" >
                    {loading ? <Skeleton /> : tweet && getNiceDate(new Date(tweet.send_at))}
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
    )
}
