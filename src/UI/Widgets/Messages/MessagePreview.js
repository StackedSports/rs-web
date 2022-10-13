import './MessagePreview.css'

import { useState, useEffect, useRef, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { Stack, Grid, Typography, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import MediaPreview from 'UI/Widgets/Media/MediaPreview'
//import Typography from 'UI/Widgets/Typography'
import LoadingOverlay from 'UI/Widgets/LoadingOverlay'

import {
    getFullName,
    getMessageStatusLabel,
    getMessageStatusColor,
    getMessagePlatformLabel,
    getMessageSenderLabel,
    getMessageRecipientsLabel,
    getMessageRecipientsLabelArray,
    formatDate,
    removeSpaces
} from 'utils/Parser'
import { objectNotNull } from 'utils/Validation'

import { messageRoutes } from 'Routes/Routes'
import RenderIf from '../RenderIf'

const getRecipientsLabel = (message) => {
    if (typeof message.recipient_count === 'number')
        return `${message.recipient_count} Recipients`

    if (!message.recipient_count?.status || message.recipient_count?.status?.total === 0)
        return '--'

    return `${message.recipient_count?.status?.total} Recipients`
}

const Label = ({ label }) => (
    <span className="MessagePreview-Label">{label}</span>
)

const Details = ({ label, value, direction = 'row', style, labelArray = false, textArea = false, color = null }) => {
    let detailClass = textArea ? 'MessageDetailTextArea' : 'MessageDetailValue'

    return (
        <Stack direction={direction} style={style}>
            <span className="DetailLabel">{label}:</span>
            {labelArray ?
                value.map(item => (
                    <span style={{ marginRight: '0.2em' }}
                        className={color ? `MessageDetailValue ${color}` : 'MessageDetailValue'}
                    >
                        {item}
                    </span>
                ))
                : (
                    <span
                        className={color ? `${detailClass} ${color}` : detailClass}
                    >
                        {value}
                    </span>
                )}
        </Stack>
    )
}

const MessagePreview = ({ message, recipients, mini = false, style, link = false, ...props }) => {
    // console.log("message", message)

    if (!message)
        return (
            <div style={{ height: 300 }}>
                {props.loading && <LoadingOverlay />}
            </div>
        )

    const [messageStats, setMessageStats] = useState(null)

    useEffect(() => {
        if (!message)
            return

        let total = message.recipient_count.status?.total || 0
        let sent = message.recipient_count.status?.sent || 0
        let error = message.recipient_count.status?.error || 0
        let pending = message.recipient_count.status?.pending || 0

        setMessageStats({
            delivery: sent === 0 ? 0 : Math.round(sent / total * 100),
            total,
            sent,
            error,
            pending,
        })
    }, [message])

    const hasMedia = useMemo(() => objectNotNull(message?.media), [message])
    const hasMediaPlaceholder = useMemo(() => objectNotNull(message?.media_placeholder), [message])

    const showMedia = hasMedia || hasMediaPlaceholder

    const getPlaceholder = () => {
        // console.log(recipients)

        if (!recipients) {
            // console.log({ ...message.media_placeholder, media: message.media_placeholder_preview })

            let media = message.media_placeholder_preview?.map(url => ({ urls: { thumb: url } }))

            return { ...message.media_placeholder, media }
        }

        let mediaFiles = []

        const pushMedia = (recipient, medias) => {
            if (objectNotNull(recipient.media))
                medias.push(recipient.media)

            if (medias.length === 3)
                return false
            else
                return true
        }

        if (recipients.contact_list.length > 0) {
            recipients.contact_list.every(recipient => pushMedia(recipient, mediaFiles))
        }

        if (mediaFiles.length < 3) {
            recipients.filter_list.every(filter => {
                return filter.contacts.every(recipient => pushMedia(recipient, mediaFiles))
            })
        }

        return {
            ...message.media_placeholder,
            media: mediaFiles
        }
    }

    const messageStatusLabel = useMemo(() => getMessageStatusLabel(message.status, message.platform?.name, message.recipient_count), [message])

    return (
        <Grid container className="MessagePreview-Container" style={style}>
            <Grid container style={{ marginBottom: 20 }}>
                {showMedia && (
                    <div className="MessagePreview-MediaPanel">
                        <MediaPreview
                            miniImage
                            cardStyle={{ marginLeft: 15, marginRight: 15, width: '300px' }}
                            type={hasMedia ? 'media' : 'placeholder'}
                            item={hasMedia ? message.media : getPlaceholder()} />
                    </div>
                )}
                <div className="MessagePreview-DetailsPanel">
                    <h3>Message Details</h3>

                    <Details
                        label="Status"
                        // value={getMessageStatusLabel(message.status)}
                        // value={getMessageStatusLabel(message.status, message.platform?.name, recipients)}
                        // status={message.status}
                        color={getMessageStatusColor(messageStatusLabel)}
                        value={messageStatusLabel}
                    />
                    <Details label="Sender" value={getMessageSenderLabel(message)} />
                    <Details label="Recipient(s)" value={getRecipientsLabel(message)} />
                    {/* <Details label="Recipient(s)" labelArray value={getMessageRecipientsLabelArray(recipients)}/> */}
                    <Details label="Send As" value={getMessagePlatformLabel(message.platform)} />
                    <Details label="Start Sending At" value={message.first_sent_at ? formatDate(message.first_sent_at, 'medium', 'short') : formatDate(message.send_at, 'medium', 'short')} />
                    <RenderIf condition={message.expires_at}>
                        <Details label="Expires At" value={formatDate(message.expires_at, 'medium', 'short')} />
                    </RenderIf>
                    <Details label="Tags" value={message.tags || '--'} />

                    <Details label="Message Text" textArea value={message.body} direction="column" style={{ marginTop: 10 }} />
                </div>
                <Grid item >
                    <h3>Message Stats</h3>

                    {messageStats && (
                        <Grid container direction="column" alignItems="center" style={{ marginTop: 10, marginBottom: 30 }}>
                            <Typography fontSize={26} fontWeight="bold"> {`${messageStats.delivery}%`} </Typography>
                            <Typography>{`Delivery Rate (${messageStats.sent}/${messageStats.total})`}</Typography>
                        </Grid>
                    )}

                    {link && <NavLink to={`${messageRoutes.details}/${message.id}`}>View Details</NavLink>}
                </Grid>
            </Grid>

            {!mini && <Label label={`Queued by ${getFullName(message.sender)} at ${formatDate(message.created_at, 'medium', 'short')}`} />}
        </Grid>
    )
}

export default MessagePreview