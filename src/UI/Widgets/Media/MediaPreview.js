import { useState } from 'react'

import { Grid, Typography, Stack, Box } from '@mui/material'
import PhotoIcon from '@mui/icons-material/Photo'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import { format } from 'date-fns'

import { usePlaceholder } from 'Api/Hooks'

const Placeholder = (props) => {
    const placeholder = usePlaceholder(props.placeholder.id)

    console.log(placeholder)

    return (
        <div>

        </div>
    )
}

const Image = (props) => {


    return (
        <img
            style={{
                objectFit: 'contain',
                width: 250,
                height: 250
            }}
            src={props.media.urls.original}
        />
    )
}

const MediaPreview = ({ type, containerStyle, ...props }) => {
    // console.log(props.media)

    const isMedia = type === 'media'

    return (
        <Grid
            container
            direction="column"
            style={{ ...styles.container, ...containerStyle }}
        >
            <Grid style={styles.mediaContainer}>
                {isMedia ? (
                    <Image media={props.media} />
                ) : (
                    <Placeholder placeholder={props.media} />
                )}
            </Grid>
            <Box style={{ padding: 10, width: '100%' }}>
                <Stack direction='row'>
                    {isMedia ? (
                        <PhotoIcon style={styles.icon} />
                    ) : (
                        <PhotoLibraryIcon style={styles.icon} />
                    )}

                    <Typography noWrap style={styles.mediaName}>{props.media?.name ? props.media?.name : props.media?.file_name }</Typography>
                </Stack>
                {props.media?.created_at && (
                    <Typography noWrap variant='caption'>Uploaded at: {format(new Date(props.media?.created_at), 'yyyy-MM-dd')}</Typography>
                )}
            </Box>
        </Grid>
    )
}

export default MediaPreview

const styles = {
    container: {
        border: '1px solid #efefef',
        borderRadius: 4,
        width: 250,
        overflow: 'hidden',
    },
    mediaContainer: {
        width: 250,
        height: 250,
        backgroundColor: '#efefef'
    },
    icon: {
        color: '#555',
        marginRight: 10
    },
    mediaName: {
        fontWeight: 'bold'
    }

}