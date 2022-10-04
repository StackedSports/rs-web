import React, { useState, useEffect, useMemo, ReactNode } from 'react'
import { Box, Checkbox, Stack, Grid, Typography, Skeleton, Divider, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import MediaPreview from '../Media/MediaPreview'
import { ITweet } from 'Interfaces'
import { getNiceDate } from 'utils/Parser';
import { tweetRoutes } from 'Routes/Routes';
import { Stat } from './components';
import { Link as RouterLink } from 'react-router-dom';

interface DetailsProps {
    label: string;
    value: string | ReactNode | null;
    column?: boolean;
    loading?: boolean;
    color?: string
}

const Details = ({ label, value, column, loading, color }: DetailsProps) => {

    return (
        <Stack direction={column ? 'column' : 'row'} mb={.5} columnGap={1.5}>
            <Typography variant='body1'>{label}:</Typography>
            <Typography
                flex={1}
                variant='body1'
                fontWeight='bold'
                color={color || 'text.primary'}
                textTransform={'capitalize'}
            >
                {loading ? <Skeleton sx={{ width: '100%', maxWidth: '300px' }} /> : value ? value : "-"}
            </Typography>
        </Stack>
    )
}

const Tags = ({ tags }: { tags: string[] }) => {
    return (
        <Stack direction='row' gap={2} flexWrap='wrap'>
            {tags.map((tag, index) => (
                <Box border={1} borderColor='#0091FF' borderRadius='3px' px={1.6}>
                    <Typography variant='body1' color='#0091FF' key={index}>{tag}</Typography>
                </Box>
            ))}
        </Stack>
    )
}

interface TweetDisplayProps {
    tweet?: ITweet;
    loading: boolean
}

export const TweetDisplay: React.FC<TweetDisplayProps> = ({ tweet, loading = true }) => {

    const statusColor = tweet?.status ?
        ({ 'published': 'success.main', 'error': 'error.main' }[tweet.status] ?? 'text.primary') :
        'text.primary'

    return (
        <Box
            display='grid'
            gridTemplateColumns='55px 1fr 250px'
            border={1}
            borderColor='divider'
        >
            <Stack justifyContent='flex-start'>
                <Checkbox />
            </Stack>
            <Grid container
                borderLeft={1}
                borderColor='divider'
            >

                {!loading && tweet && tweet.media?.[0] && (
                    <Grid item xs='auto' p={2} >
                        <MediaPreview
                            type={'media'}
                            item={tweet.media?.[0]}
                            miniImage
                            cardStyle={{ marginRight: 15, width: '300px' }}
                        />
                    </Grid>
                )}

                <Grid item xs container direction='column' p={2}>
                    <Typography fontSize='18px' fontWeight='bold' mb={2} >
                        Post Details
                    </Typography>

                    <Details label='Message Status' value={tweet?.status} loading={loading} color={statusColor} />
                    <Details label='Published on' value='Twitter' loading={loading} />
                    <Details label='Published to' value={tweet?.twitter} loading={loading} />
                    <Details label='Published Time' value={tweet?.send_at && getNiceDate(new Date(tweet.send_at))} loading={loading} />
                    {/* <Details label='Tags' value={<Tags tags={['OV Weekend', 'June Camps']} />} /> */}
                    <Details label='Post Text' value={tweet?.body} column loading={loading} />
                </Grid>

                <Grid xs={12} mt={'auto'} p={1}>
                    <Typography fontSize='18px' color='text.secondary' marginTop='auto' >
                        {loading ?
                            <Skeleton /> :
                            `Queued by ${tweet?.queued_by} ${tweet?.created_at && `- ${getNiceDate(new Date(tweet?.created_at))}`}`
                        }
                    </Typography>
                </Grid>

            </Grid>

            <Stack sx={{ borderLeft: 1, borderColor: 'divider', py: 2 }} gap={1}>
                <Typography
                    variant="subtitle1"
                    style={{ width: "100%", textAlign: "center", fontWeight: 'bold' }}
                >
                    {loading ? <Skeleton /> : "Post Stats"}
                </Typography>

                <Divider />

                <Stack spacing={3} divider={<Divider />}>
                    <Stack gap={2}>
                        <Stat
                            loading={loading}
                            label="Contact Engagement"
                            value={0}
                            total={0}
                        />
                        <Stat
                            loading={loading}
                            label="Likes Rate"
                            value={0}
                            total={0}
                        />
                        <Stat
                            loading={loading}
                            label="Retweet Rate"
                            value={0}
                            total={0}
                        />
                    </Stack>

                    {loading ?
                        <Skeleton /> :
                        <Button
                            variant='outlined'
                            endIcon={<SearchIcon />}
                            sx={{ alignSelf: 'center' }}
                            component={RouterLink}
                            to={`${tweetRoutes.details}/${tweet?.id}`}
                        >
                            View Details
                        </Button>
                    }
                </Stack>
            </Stack>
        </Box>
    )
}

export default TweetDisplay