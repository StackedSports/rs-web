import React, { useState, useEffect, useMemo, ReactNode } from 'react'
import { Box, Checkbox, Stack, Grid, Typography, Skeleton } from '@mui/material'
import MediaPreview from '../Media/MediaPreview'
import { ITweet } from 'Interfaces'
import { getNiceDate } from 'utils/Parser';

interface DetailsProps {
    label: string;
    value: string | ReactNode | null;
    column?: boolean;
    loading?: boolean
}

const Details = ({ label, value, column, loading }: DetailsProps) => {

    return (
        <Stack direction={column ? 'column' : 'row'} mb={.5} columnGap={1.5}>
            <Typography variant='body1'>{label}:</Typography>
            <Typography
                flex={1}
                variant='body1'
                fontWeight='bold'
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
    return (
        <Box
            display='grid'
            gridTemplateColumns='55px 1fr'
            border={1}
            borderColor='divider'
        >
            <Stack justifyContent='flex-start'>
                <Checkbox />
            </Stack>
            <Grid container
                borderLeft={1}
                borderColor='divider'
                padding={4}
                paddingBottom={2}
            >
                {tweet && tweet.media?.[0] && (
                    <Grid item xs='auto'>
                        <MediaPreview
                            type={'media'}
                            item={tweet.media?.[0]}
                            miniImage
                            cardStyle={{ marginRight: 15, width: '300px' }}
                        />
                    </Grid>
                )}

                <Grid item xs>
                    <Typography fontSize='18px' fontWeight='bold' mb={2} >
                        Post Details
                    </Typography>

                    <Details label='Message Status' value={tweet?.status} loading={loading} />
                    <Details label='Published on' value='Twitter' loading={loading} />
                    <Details label='Published to' value={tweet?.twitter} loading={loading} />
                    <Details label='Published Time' value={tweet?.send_at && getNiceDate(new Date(tweet.send_at))} loading={loading} />
                    {/* <Details label='Tags' value={<Tags tags={['OV Weekend', 'June Camps']} />} /> */}
                    <Details label='Post Text' value={tweet?.body} column loading={loading} />
                </Grid>
                <Grid item xs={12} mt={3}>
                    <Typography fontSize='18px' color='text.secondary' >
                        {loading ?
                            <Skeleton /> :
                            `Queued by ${tweet?.queued_by} ${tweet?.created_at && `- ${getNiceDate(new Date(tweet?.created_at))}`}`
                        }
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TweetDisplay