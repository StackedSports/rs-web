import { useState } from 'react'

import { Card, CardContent, CardActionArea, Typography, Stack, Box, Tooltip, Checkbox, styled } from "@mui/material"
import PhotoIcon from '@mui/icons-material/Photo'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'


import { formatDate } from "utils/Parser"
import { Link } from "react-router-dom"

const PlaceholderImage = (props) => {
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

const MediaImage = (props) => {

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

const MediaPreview = ({ type, ...props }) => {
    if(!props.item)
        return <></>
    
    const [isHovering, setIsHovering] = useState(false)

    const isMedia = type === 'media'

    const selectable = (props.onSelectedChange && props.onSelectedChange instanceof Function) ? true : false

    const cardActionProps = () => {
        if (props.linkTo) {
            return ({
                component: Link,
                to: props.linkTo,
            })
        } else {
            return ({
                onClick: props.onClick,
            })
        }
    }

    const onMediaClick = () => {
        if (props.onClick && typeof props.onClick === 'function') {
            onClick(props.media)
        }
    }

    const onCheckboxChange = (event) => {
        props.onSelectedChange(event.target.checked)
    }

    const onMouseEnter = (e) => {
        setIsHovering(true)
    }

    const onMouseLeave = (e) => {
        setIsHovering(false)
    }

    return (
        <StyledCard
          variant="outlined"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ ...props.cardStyle }}
        >
            <CardActionArea {...cardActionProps()}disableRipple >
                <CardImage>
                    {isMedia ? (
                        <MediaImage media={props.item} />
                    ) : (
                        <PlaceholderImage placeholder={props.item} />
                    )}
                    {selectable && (isHovering || props.selected) &&
                        <StyledCheckBox
                            // color="primary"
                          checked={props.selected}
                          disableRipple
                          onChange={onCheckboxChange}
                          onClick={e => e.stopPropagation()}
                        />
                    }
                </CardImage>
                <CardContent>
                    <Stack direction='row'>
                        {isMedia ? (
                            <PhotoIcon />
                        ) : (
                            <PhotoLibraryIcon />
                        )}
                        <Tooltip
                            title={props.item?.name ? props.item?.name : props.item?.file_name || ''}
                        >
                            <Typography noWrap fontWeight='bold'>
                                {props.item?.name ? props.item?.name : props.item?.file_name}
                            </Typography>
                        </Tooltip>
                    </Stack>
                    {props.item?.created_at && (
                        <Typography noWrap variant='caption'>
                            Uploaded at:
                            {formatDate(props.item?.created_at)}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </StyledCard>
    )
}

export default MediaPreview

// const styles = {
//     container: {
//         border: '1px solid #efefef',
//         borderRadius: 4,
//         width: 250,
//         overflow: 'hidden',
//     },
//     mediaContainer: {
//         width: 250,
//         height: 250,
//         backgroundColor: '#efefef'
//     },
//     icon: {
//         color: '#555',
//         marginRight: 10
//     },
//     mediaName: {
//         fontWeight: 'bold'
//     }

// }

const StyledCard = styled(Card)(({ theme, width }) => ({
    width: width ? width : 250,
    overflow: 'hidden',

    '.MuiSvgIcon-root': {
        color: theme.palette.text.secondary,
        marginRight: 10,
    },

    'a:hover': {
        textDecoration: 'none',
        color: 'inherit',
    },

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

const StyledCheckBox = styled(Checkbox)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
}));