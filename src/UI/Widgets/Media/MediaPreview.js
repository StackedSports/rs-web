import { useState, useRef, useEffect, useContext, useMemo } from 'react'

import { Link } from "react-router-dom"

import { Card, CardContent, CardActionArea, Typography, Stack, Box, Tooltip, Checkbox, IconButton, styled } from "@mui/material"
import {
    ImageOutlined,
    GifBoxOutlined,
    PermMediaOutlined,
    SmartDisplayOutlined,
    Send as SendIcon,
    Fullscreen as FullscreenIcon
} from '@mui/icons-material'

import { IconContext } from "react-icons"
import { GrDocumentPdf } from 'react-icons/gr'
import { RiVideoLine } from 'react-icons/ri'
import { MdOutlineImage } from 'react-icons/md'
import { AiOutlineGif } from 'react-icons/ai'

import RenderIf from '../RenderIf'
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

            {images && images[0] && (
                <Box
                    sx={{
                        position: 'absolute',
                        width: '50%',
                        height: '100%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 0,
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

        </Box>
    )
}

const MediaImage = (props) => {
    //console.log(props.size)
    return (
        <img
            style={{
                objectFit: 'contain',
                width: props.size,
                height: props.size
            }}
            src={props.media?.urls?.large || props.media?.urls?.thumb}
        />
    )
}

const MediaPreview = ({ type, ...props }) => {
    if (!props.item)
        return <></>

    const app = useContext(AppContext)
    const self = useRef(null)

    const [width, setWidth] = useState(props.width || 200)
    const [isHovering, setIsHovering] = useState(false)
    const [isChecked, setIsChecked] = useState(props.selected || false)

    useEffect(() => {
        setIsChecked(props.selected ? true : false)
    }, [props.selected])

    const isMedia = type === 'media'

    const selectable = (props.onSelectedChange && props.onSelectedChange instanceof Function) ? true : false
    const showSendOnHover = (props.onSendClick && props.onSendClick instanceof Function) ? true : false

    useEffect(() => {
        if (!self.current || props.miniImage || props.width)
            return

        // console.log(self.current.clientWidth)
        //console.log(props.miniImage)
        setWidth(self.current.clientWidth)
    }, [self.current, app.windowSize])

    const fileType = useMemo(() => {
        //console.log(props.item.file_type)

        const getFileType = (type) => {
            switch (type) {
                case 'image/png':
                case 'image/jpeg':
                    return 'image'
                case 'image/gif':
                    return 'gif'
                case 'application/pdf':
                    return 'pdf'
                case 'video/mp4':
                    return 'video'
                default:
                    // props.item.name

                    // let parts = 
                    return 'unknown'
            }
        }

        return getFileType(props.item.file_type)

    }, [isMedia, props.item])

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

    const onPreviewClick = (e) => {
        e.stopPropagation()
        props.onPreviewClick(props.item)
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
                    isChecked={isChecked}
                    size={width}
                >
                    {isMedia ? (
                        <MediaImage media={props.item} size={width} />
                    ) : (
                        <PlaceholderImage placeholder={props.item} size={width} />
                    )}
                    {selectable && (isHovering || isChecked) &&
                        <StyledCheckBoxContainer isHovering={isHovering}>
                            <StyledCheckBox
                                color="primary"
                                checked={isChecked}
                                disableRipple
                                onChange={onCheckboxChange}
                                onClick={e => e.stopPropagation()}
                            />
                        </StyledCheckBoxContainer>
                    }
                    <RenderIf condition={isHovering && props.onPreviewClick}>
                        <StyledPreviewButton onMouseDown={onPreviewClick}>
                            <FullscreenIcon />
                        </StyledPreviewButton>
                    </RenderIf>
                    <RenderIf condition={showSendOnHover && isHovering}>
                        <StyledIconButton onMouseDown={onSendClick}>
                            <SendIcon />
                        </StyledIconButton>
                    </RenderIf>
                </CardImage>
                {!props.mini && (
                    <CardContent>
                        <Stack direction='row'>
                            <RenderIf condition={isMedia && fileType === 'image'}>
                                <ImageOutlined />
                            </RenderIf>
                            <RenderIf condition={isMedia && fileType === 'video'}>
                                <SmartDisplayOutlined />
                            </RenderIf>
                            <RenderIf condition={isMedia && fileType === 'gif'}>
                                <GifBoxOutlined />
                            </RenderIf>
                            <RenderIf condition={isMedia && fileType === 'pdf'}>
                                <div>
                                    <GrDocumentPdf />
                                </div>
                            </RenderIf>
                            <RenderIf condition={!isMedia}>
                                <PermMediaOutlined />
                            </RenderIf>
                            <Tooltip
                                title={props.item?.name ? props.item?.name : props.item?.file_name || ''}
                            >
                                <Typography noWrap fontWeight='bold' ml={1}>
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

const CardImage = styled(Box)(({ theme, isHovering, isChecked, showOverlay, size }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: size,
    backgroundColor: '#efefef',
    position: 'relative',
    overflow: 'hidden',

    '.MuiSvgIcon-root': {
        color: isHovering ? theme.palette.common.white : theme.palette.primary.main,
    },

    '&::after': ((isHovering || isChecked) && showOverlay) ? {
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

const StyledCheckBoxContainer = styled(Box)(({ theme, isHovering }) => ({
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1,
    backgroundColor: isHovering ? 'transparent' : 'white',
    borderRadius: 4
}))

const StyledCheckBox = styled(Checkbox)(({ theme }) => ({
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // zIndex: 1,
    color: 'primary',
    padding: 0
}));

const StyledPreviewButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    right: 36,
    zIndex: 1,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
}));