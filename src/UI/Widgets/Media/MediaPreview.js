import { useState } from 'react'

import { Card, CardContent, CardActionArea, Typography, Stack, Box, Tooltip, Checkbox, IconButton, styled } from "@mui/material"
import PhotoIcon from '@mui/icons-material/Photo'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import SendIcon from '@mui/icons-material/Send';


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
    if (!props.item)
        return <></>

    const [isHovering, setIsHovering] = useState(false)

    const isMedia = type === 'media'

    const selectable = (props.onSelectedChange && props.onSelectedChange instanceof Function) ? true : false
    const showSendOnHover = (props.onSendClick && props.onSendClick instanceof Function) ? true : false

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

    const onSendClick = (e) => {
        console.log(e)
        e.stopPropagation()
        props.onSendClick(props.item)
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
            <CardActionArea {...cardActionProps()} disableRipple >
                <CardImage isHovering={isHovering} showOverlay={selectable || showSendOnHover} >
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
                    {(showSendOnHover && isHovering) &&
                        <StyledIconButton onMouseDown={onSendClick}>
                            <SendIcon />
                        </StyledIconButton>
                    }
                </CardImage>
                {!props.mini && (
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
                )}
            </CardActionArea>
        </StyledCard>
    )
}

export default MediaPreview

const StyledCard = styled(Card)(({ theme, width }) => ({
    width: width ? width : 250,
    overflow: 'hidden',

    'a:hover': {
        textDecoration: 'none',
        color: 'inherit',
    },

}));

const CardImage = styled(Box)(({ theme, isHovering,showOverlay }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250,
    backgroundColor: '#efefef',
    position: 'relative',
    overflow: 'hidden',

    '.MuiSvgIcon-root': {
        color: isHovering ? theme.palette.common.white : theme.palette.grey[700],
    },

    '&::after': (isHovering && showOverlay) ? {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 1,
    } : '',

}));

const StyledCheckBox = styled(Checkbox)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
}));