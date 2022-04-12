import { Card, CardContent, CardActionArea, Typography, Stack, Box, Tooltip, styled } from "@mui/material"
import PhotoIcon from '@mui/icons-material/Photo'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'

import { formatDate } from "utils/Parser"
import { Link } from "react-router-dom"

const PlaceholderImage = ({ placeholder }) => {

    const images = placeholder?.media?.slice(0, 3).map(item => item.urls.original)
    if (!images) return null
    return (
        <>
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
        </>
    )
}

const MediaImage = ({ media }) => {
    return (
        <img
            style={{
                objectFit: 'contain',
                width: '100%',
                height: 'auto',
            }}
            src={media?.urls?.original}
        />
    )
}

export const MyMediaPreview = ({ type = 'media', item, href, ...restOfProps }) => {

    const isMedia = type === 'media'

    return (
        <StyledCard variant="outlined" {...restOfProps}>
            <CardActionArea>
                <CardImage>
                    {isMedia ? (
                        <MediaImage media={item} />
                    ) : (
                        <PlaceholderImage placeholder={item} />
                    )}
                </CardImage>
                <CardContent>
                    <Stack direction='row'>
                        {isMedia ? (
                            <PhotoIcon />
                        ) : (
                            <PhotoLibraryIcon />
                        )}
                        <Tooltip
                            title={item?.name ? item?.name : item?.file_name || ''}
                        >
                            <Typography noWrap fontWeight='bold'>
                                {item?.name ? item?.name : item?.file_name}
                            </Typography>
                        </Tooltip>
                    </Stack>
                    {item?.created_at && (
                        <Typography noWrap variant='caption'>
                            Uploaded at:
                            {formatDate(item?.created_at)}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </StyledCard>
    )
}

export default MyMediaPreview

const StyledCard = styled(Card)(({ theme, width }) => ({
    width: width ? width : 250,
    overflow: 'hidden',

    '.MuiSvgIcon-root': {
        color: theme.palette.text.secondary,
        marginRight: 10,
    }
}));

const CardImage = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250,
    backgroundColor: '#efefef',
    position: 'relative',
    overflow: 'hidden',
}));