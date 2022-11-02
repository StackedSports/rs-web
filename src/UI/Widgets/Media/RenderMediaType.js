import { Box, createSvgIcon, Hidden, styled } from '@mui/material'
import React, { useState } from 'react'
import RenderIf from '../RenderIf'
import CircularProgress from '@mui/material/CircularProgress';
const BrokenImageIcon = createSvgIcon(
    <path d="M21 5v6.59l-2.29-2.3c-.39-.39-1.03-.39-1.42 0L14 12.59 10.71 9.3a.9959.9959 0 0 0-1.41 0L6 12.59 3 9.58V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42 3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l2.29 2.29c.39.39 1.02.39 1.41 0l3.3-3.3 3.29 3.29c.39.39 1.02.39 1.41 0l3.3-3.28z" />,
    'BrokenImageIcon'
);

export const RenderMediaType = (props) => {
    const { url, type } = props
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    console.log(url, type)

    const handleLoad = () => {
        setLoaded(true);
        setError(false);
    }

    const handleError = () => {
        setError(true);
        setLoaded(false);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: props.width || '100%',
                height: props.height || '100%',
                overflow: 'hidden',
                ...props.sx
            }}
        >
            <RenderIf condition={url && type === 'video'}>
                <video controls src={url} style={{ width: '100%', opacity: loaded ? 1 : 0, }} onLoadStart={handleLoad} onError={handleError} />
            </RenderIf>
            <RenderIf condition={url && type === 'pdf'}>
                <embed src={url} style={{ width: '100%', opacity: loaded ? 1 : 0, }} onLoad={handleLoad} onError={handleError} />
            </RenderIf>
            <RenderIf condition={url && type !== 'video' && type !== 'pdf'}>
                <img
                    src={url}
                    loading='lazy'
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: loaded ? 1 : 0,
                    }}
                    onLoad={handleLoad}
                    onError={handleError}
                />
            </RenderIf>
            {
                <Icons>
                    {error && <BrokenImageIcon style={{ fontSize: 56, color: '#bdbdbd' }} />}
                    {!error && !loaded && <CircularProgress size={56} thickness={5} />}
                </Icons>
            }
        </Box>
    )
}

const Icons = styled('div')({
    width: '100%',
    marginLeft: '-100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});