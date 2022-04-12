import { useState } from 'react'

import { Grid, Typography, Stack, Box, Tooltip } from '@mui/material'
import PhotoIcon from '@mui/icons-material/Photo'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import { format } from 'date-fns'

const Placeholder = (props) => {

    const images = props.placeholder?.media?.slice(0, 3).map(item => item.urls.original)

    return (
        <Box
            width={250}
            height={250}
            position='relative'
            overflow='hidden'
        >
            {images && images[0] && (
                <Box
                  sx={{
                    position: 'absolute',
                    width: '50%',
                    height: '100%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                  }}
                >
                    <img
                      src={images[0]}
                      alt='placeholder'
                      height='100%'
                      width='100%'
                      style={{ objectFit: 'contain' }}
                    />
                </Box>
            )}

            {images && images[0] && (
                <Box
                  sx={{
                    position: 'absolute',
                    width: '50%',
                    height: '100%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-100%, -50%)  scale(0.7)',
                    zIndex: 0,
                  }}
                >
                    <img
                      src={images[1] ? images[1] : images[0]}
                      alt='placeholder'
                      height='100%'
                      width='100%'
                      style={{ objectFit: 'contain' }}
                    />
                </Box>
            )}

            {images && images[0] && (
                <Box
                  sx={{
                    position: 'absolute',
                    width: '50%',
                    height: '100%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(0, -50%) scale(0.7)',
                    zIndex: 0,

                  }}
                >
                    <img
                      src={images[2] ? images[2] : images[0]}
                      alt='placeholder'
                      height='100%'
                      width='100%'
                      style={{ objectFit: 'contain' }}
                    />
                </Box>
            )}


        </Box>
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
            src={props.media?.urls?.original}
        />
    )
}

const MediaPreview = ({ type, containerStyle, onClick, ...props }) => {
    if(!props.media)
        return <></>
    // console.log(props.media)

    const isMedia = type === 'media'

    const onMediaClick = () => {
        if (onClick && typeof onClick === 'function') {
            onClick(props.media)
        }
    }

    return (
        <Grid
            container
            direction="column"
            onClick={onMediaClick}
            style={{ ...styles.container, ...containerStyle }}
        >
            <Box style={styles.mediaContainer}>
                {isMedia ? (
                    <Image media={props.media} />
                ) : (
                    <Placeholder placeholder={props.media} />
                )}
            </Box>
            <Box style={{ padding: 10, width: '100%' }}>
                <Stack direction='row'>
                    {isMedia ? (
                        <PhotoIcon style={styles.icon} />
                    ) : (
                        <PhotoLibraryIcon style={styles.icon} />
                    )}
                    <Tooltip title={props.media?.name ? props.media?.name : props.media?.file_name} arrow>
                        <Typography noWrap style={styles.mediaName}>
                            {props.media?.name ? props.media?.name : props.media?.file_name}
                        </Typography>
                    </Tooltip>
                </Stack>
                {props.media?.created_at && (
                    <Typography noWrap variant='caption'>
                        Uploaded at: {format(new Date(props.media?.created_at), 'yyyy-MM-dd')}
                    </Typography>
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