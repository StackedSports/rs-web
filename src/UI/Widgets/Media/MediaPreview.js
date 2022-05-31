import { useState, useRef, useEffect, useContext } from 'react'

import { Link } from "react-router-dom"

import { Card, CardContent, CardActionArea, Typography, Stack, Box, Tooltip, Checkbox, IconButton, styled } from "@mui/material"
import PhotoIcon from '@mui/icons-material/Photo'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import SendIcon from '@mui/icons-material/Send';

import { AppContext } from 'Context/AppProvider'

import { formatDate } from "utils/Parser"

const PlaceholderImage = (props) => {
    const images = props.placeholder?.media?.slice(0, 3).map(item => item.urls)

    return (
        <Box
            width={props.size}
            height={props.size}
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
                        src={images[0].thumb || images[0].original}
                        alt='placeholder'
                        height='100%'
                        width='100%'
                        style={{ objectFit: 'contain' }}
                    />
                </Box>
            )}

            {images && images[1] && (
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
                        src={images[1].thumb || images[1].original}
                        alt='placeholder'
                        height='100%'
                        width='100%'
                        style={{ objectFit: 'contain' }}
                    />
                </Box>
            )}

            {images && images[2] && (
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
                        src={images[2].thumb || images[2].original}
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
                width: props.size,
                height: props.size
            }}
            src={props.media?.urls?.thumb || props.media?.urls?.original}
        />
    )
}

const MediaPreview = ({ type, ...props }) => {
    if (!props.item)
        return <></>

    const app = useContext(AppContext)
    const self = useRef(null)

    const [width, setWidth] = useState(250)
    const [isHovering, setIsHovering] = useState(false)
    const [isChecked, setIsChecked] = useState(props.selected || false)

    useEffect(() => {
        setIsChecked(props.selected ? true : false)
    }, [props.selected])

    const isMedia = type === 'media'

    const selectable = (props.onSelectedChange && props.onSelectedChange instanceof Function) ? true : false
    const showSendOnHover = (props.onSendClick && props.onSendClick instanceof Function) ? true : false

    useEffect(() => {
        if (!self.current)
            return

        // console.log(self.current.clientWidth)
        setWidth(self.current.clientWidth)
    }, [self.current, app.windowSize])

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
        setIsChecked(event.target.checked)
        props.onSelectedChange(event.target.checked)
    }

    const onSendClick = (e) => {
        //console.log(e)
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
            ref={self}
            variant="outlined"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            width={width}
            style={{ ...props.cardStyle }}
        >
            <CardActionArea {...cardActionProps()} disableRipple >
                <CardImage
                    isHovering={isHovering}
                    showOverlay={selectable || showSendOnHover}
                    size={width}
                >
                    {isMedia ? (
                        <MediaImage media={props.item} size={width} />
                    ) : (
                        <PlaceholderImage placeholder={props.item} size={width} />
                    )}
                    {selectable && (isHovering || isChecked) &&
                        <StyledCheckBox
                            // color="primary"
                            checked={isChecked}
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
    // width: width ? width : 10,
    overflow: 'hidden',

    'a:hover': {
        textDecoration: 'none',
        color: 'inherit',
    },

}));

const CardImage = styled(Box)(({ theme, isHovering, showOverlay, size }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: size,
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
        zIndex: 0,
    } : '',

}));

const StyledCheckBox = styled(Checkbox)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
}));