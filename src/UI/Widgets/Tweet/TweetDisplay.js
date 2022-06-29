import { useState, useEffect, useMemo } from 'react'
import { Box, Checkbox, Stack, Grid, Typography } from '@mui/material'
import MediaPreview from '../Media/MediaPreview'
import RenderIf from '../RenderIf'

const Details = ({ label, value, column }) => {
    return (
        <Stack direction={column ? 'column' : 'row'} mb={.5} columnGap={1.5}>
            <Typography variant='body1'>{label}:</Typography>
            <Typography variant='body1' fontWeight='bold'>{value}</Typography>
        </Stack>
    )
}

const renderTags = (tags) => {
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

export const TweetDisplay = (props) => {
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
                <RenderIf condition={props.tweet?.media}>
                    <Grid item xs='auto'>
                        <MediaPreview
                            type={'media'}
                            item={props.tweet?.media}
                        />
                    </Grid>
                </RenderIf>
                <Grid item xs>
                    <Typography fontSize='18px' fontWeight='bold' mb={2} >
                        Post Details
                    </Typography>

                    <Details label='Message Status' value='Published' />
                    <Details label='Published on' value='Twitter' />
                    <Details label='Published to' value='@JakeSmith21' />
                    <Details label='Published Time' value='June 15, 2021 at 2:20pm' />
                    <Details label='Tags' value={renderTags(['OV Weekend', 'June Camps'])} />
                    <Details label='Post Text' value='Check us out on ESPN tonight at 7pm est!  #StackedSports' column />
                </Grid>
                <Grid item xs={12} mt={3}>
                    <Typography fontSize='18px'color='text.secondary' >
                        Queued by Chris Highland - 6/14/21 at 2:01pm
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TweetDisplay