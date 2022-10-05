import React from 'react'
import { Box, Checkbox, Stack, Grid, Typography, Skeleton, Divider, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { ITweet } from 'Interfaces'
import { getNiceDate } from 'utils/Parser';
import { tweetRoutes } from 'Routes/Routes';
import { Details, Stat } from './components';
import { Link as RouterLink } from 'react-router-dom';
import { TweetPost } from './TweetPost';
import RenderIf from '../RenderIf';

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
    loading?: boolean;
    showDetails?: boolean;
    showCheckbox?: boolean
}

export const TweetDisplay: React.FC<TweetDisplayProps> = ({ tweet, loading = true, showDetails = false, showCheckbox = false }) => {

    const statusColor = tweet?.status ?
        ({ 'published': 'success.main', 'error': 'error.main' }[tweet.status] ?? 'text.primary') :
        'text.primary'

    return (
        <Box
            display='grid'
            gridTemplateColumns={showCheckbox ? '55px 1fr 250px' : '1fr 250px'}
            border={1}
            borderColor='divider'
        >
            {
                showCheckbox &&
                <Stack justifyContent='flex-start'>
                    <Checkbox />
                </Stack>
            }
            <Stack
                borderLeft={1}
                borderColor='divider'
            >
                <Box p={2} pb={0}>
                    <Typography fontSize='18px' fontWeight='bold' >
                        Post Details
                    </Typography>
                </Box>

                <Grid container flex={1} >
                    <Grid item xs={'auto'} p={2} pr={0}>
                        <Box width={'500px'}>
                            <TweetPost tweet={tweet} loading={loading} />
                        </Box>
                    </Grid>

                    {showDetails && (
                        <Grid item xs container direction='column' p={2} gap={.5} >

                            <Details label='Post Status' value={tweet?.status} loading={loading} color={statusColor} />
                            <Details label='Published on' value='Twitter' loading={loading} />
                            <Details label='Published to' value={tweet?.twitter} loading={loading} />
                            <Details label='Published Time' value={tweet?.send_at && getNiceDate(new Date(tweet.send_at))} loading={loading} />
                            {/* <Details label='Tags' value={<Tags tags={['OV Weekend', 'June Camps']} />} /> */}
                            <Details label='Post Text' value={tweet?.body} column loading={loading} />
                        </Grid>
                    )}
                </Grid>

                <Box mt='auto' p={1}>
                    <Typography fontSize='18px' color='text.secondary' marginTop='auto' >
                        {loading ?
                            <Skeleton /> :
                            `Queued by ${tweet?.queued_by} ${tweet?.created_at && `- ${getNiceDate(new Date(tweet?.created_at))}`}`
                        }
                    </Typography>
                </Box>

            </Stack>

            <Stack sx={{ borderLeft: 1, borderColor: 'divider', py: 2 }} gap={1}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold', textAlign: 'center' }}
                >
                    {loading ? <Skeleton /> : "Post Stats"}
                </Typography>

                <Divider />

                <Stack gap={3} flex={1}>
                    <Stack gap={2} flex={1} >
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
                    <RenderIf condition={!showDetails}>
                        {loading ?
                            <Skeleton /> :
                            <Stack borderTop={1} borderColor='divider' pt={2} >
                                <Button
                                    variant='outlined'
                                    endIcon={<SearchIcon />}
                                    sx={{ alignSelf: 'center' }}
                                    component={RouterLink}
                                    to={`${tweetRoutes.details}/${tweet?.id}`}
                                >
                                    View Details
                                </Button>
                            </Stack>
                        }
                    </RenderIf>
                </Stack>
            </Stack >
        </Box >
    )
}

export default TweetDisplay