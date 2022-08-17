import React from 'react'
import RenderIf from '../RenderIf'

export const RenderMediaType = (props) => {
    const { url, type } = props

    return (
        <>
            <RenderIf condition={url && type === 'video'}>
                <video controls src={url} style={{ width: '100%' }} />
            </RenderIf>
            <RenderIf condition={url && type === 'pdf'}>
                <embed src={url} style={{ width: '100%' }} />
            </RenderIf>
            <RenderIf condition={url && type !== 'video' && type !== 'pdf'}>
                <img
                    src={url}
                    loading='lazy'
                    style={{ width: '100%' }}
                />
            </RenderIf>
        </>
    )
}
