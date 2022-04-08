import { useParams } from "react-router-dom"
import { AutoFixHigh, LocalOfferOutlined } from "@mui/icons-material"
import { Grid, Stack, Box, Typography, Paper, styled } from "@mui/material"

import MainLayout from 'UI/Layouts/MainLayout'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'

import { useMedia } from "Api/Hooks"

export const MediaDetailsPage = () => {
    const { id } = useParams()

    const { item: media, loading } = useMedia(id)

    console.log(media)

    const mainActions = [
        {
            name: 'Action',
            icon: AutoFixHigh,
            variant: 'outlined',
        },
        {
            name: 'Tag',
            icon: LocalOfferOutlined,
            variant: 'outlined',
        },
    ]


    return (
        <MainLayout
            title="Media Details"
            actions={mainActions}
            loading={loading}

        >
            <Box
                sx={{
                    mt: 3,

                }}>
                <Grid container spacing={2} >

                    <Grid
                        item
                        xs={8}
                        xl={10}
                        justifyContent="center"
                    >

                        <Box
                            sx={{
                                p: 3,
                            }}
                        >
                            <Stack direction='row' spacing={2}>
                                <MediaPreview
                                    media={media}
                                    loading={loading}
                                    type='media'
                                />
                                <Box
                                >
                                    <Typography variant="title">
                                        {media?.name || media?.file_name}
                                    </Typography>
                                    <Typography variant="body1">
                                        File Type : {media?.file_type}
                                    </Typography>
                                    <Typography variant="body1">
                                        Uploaded on : {media?.updated_at}
                                    </Typography>
                                    <Typography variant="body1">
                                        Uploaded by : {media?.owner?.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        File Size: {media?.size}
                                    </Typography>
                                    <Typography variant="body1">
                                        Tags :
                                    </Typography>
                                </Box>

                            </Stack>

                            <Box
                                sx={{
                                    border: '1px solid #efefef',
                                    my: 3,
                                }}
                            >
                                <Typography variant='title' color={'text.secondary'} fontWeight='bold'>
                                    Owner
                                </Typography>
                            </Box>

                        </Box>
                    </Grid>

                    <Grid
                        item
                        xs={4}
                        xl={2}
                    >
                        <MediaStatsCollumn>
                            <Typography variant='title'>
                                Media Status
                            </Typography>
                            <Stack>
                                <Typography variant="title2" color='text.secondary' gutterBottom >
                                    Media Sent in:
                                </Typography>
                                <Typography variant='title'>
                                    {
                                        media?.activity && Object.values(media.activity).reduce((acc, item) => acc + item, 0)
                                    } Messages
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="title2" color='text.secondary' gutterBottom >
                                    Media Published in:
                                </Typography>
                                <Typography variant='title'>
                                    {media?.activity?.tweets} Tweets
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography variant="title2" gutterBottom >
                                    Messaging Stats:
                                </Typography>

                                <Stack justifyContent='center' alignItems='center'>
                                    <Typography variant='title'>
                                        -
                                    </Typography>
                                    <Typography variant='caption'>
                                        Response Rate (0/0)
                                    </Typography>
                                </Stack>

                                <Stack justifyContent='center' alignItems='center'>
                                    <Typography variant='title'>
                                        -
                                    </Typography>
                                    <Typography variant='caption'>
                                        Opt-out Rate (0/0)
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Stack>
                                <Typography variant="title2" gutterBottom >
                                    Post Stats:
                                </Typography>

                                <Stack justifyContent='center' alignItems='center'>
                                    <Typography variant='title'>
                                        -
                                    </Typography>
                                    <Typography variant='caption'>
                                        Contact Engagement
                                    </Typography>
                                </Stack>

                                <Stack justifyContent='center' alignItems='center'>
                                    <Typography variant='title'>
                                        -
                                    </Typography>
                                    <Typography variant='caption'>
                                        Favourites from Contacts
                                    </Typography>
                                </Stack>

                                <Stack justifyContent='center' alignItems='center'>
                                    <Typography variant='title'>
                                        -
                                    </Typography>
                                    <Typography variant='caption'>
                                        Retweets front Contacts
                                    </Typography>
                                </Stack>
                            </Stack>

                        </MediaStatsCollumn>
                    </Grid>
                </Grid>
            </Box>
        </MainLayout >
    )
}

const MediaStatsCollumn = styled(Stack)({
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    ' > *': {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        border: '1px solid #efefef',
    }
});

export default MediaDetailsPage
