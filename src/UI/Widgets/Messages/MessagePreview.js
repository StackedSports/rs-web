import './MessagePreview.css'

import { useState, useEffect, useRef, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { Grid } from "@material-ui/core"
import LoadingButton from '@mui/lab/LoadingButton'

import MediaPreview from 'UI/Widgets/Media/MediaPreview'
import Typography from 'UI/Widgets/Typography'
import LoadingOverlay from 'UI/Widgets/LoadingOverlay'

import {
    getFullName,
    getMessageStatusLabel,
    getMessagePlatformLabel,
    getMessageSenderLabel,
    getMessageRecipientsLabel,
    getMessageRecipientsLabelArray,
    formatDate,
    removeSpaces
} from 'utils/Parser'
import { objectNotNull } from 'utils/Validation'

import { messageRoutes } from 'Routes/Routes'

const getRecipientsLabel = (message) => {
    if (message.recipient_count === 0)
        return '--'

    return `${message.recipient_count} Recipients`
}

const Label = ({ label }) => (
    <span className="MessagePreview-Label">{label}</span>
)

const Details = ({ label, value, status, direction = 'row', style, labelArray = false, textArea = false }) => {
    let detailClass = textArea ? 'MessageDetailTextArea' : 'MessageDetailValue'

    // if(textArea)
    //     detailClass += ' TextArea'

    return (
        <Grid container style={style}>
            <span className="DetailLabel">{label}:</span>
            {labelArray ?
                value.map(item => (
                    <span style={{ marginRight: '0.2em' }}
                        className={status ? `MessageDetailValue ${removeSpaces(status)}` : 'MessageDetailValue'}
                    >
                        {item}
                    </span>
                ))
                : (
                    <span
                        className={status ? `${detailClass} ${removeSpaces(status)}` : detailClass}
                    >
                        {value}
                    </span>
                )}
        </Grid>
    )
}

const MessagePreview = ({ message, recipients, mini = false, style, link = false, ...props }) => {
    if (!message)
        return (
            <div style={{ height: 300 }}>
                {props.loading && <LoadingOverlay />}
            </div>
        )

    const [messageStats, setMessageStats] = useState(null)
    useEffect(() => {
        if (!recipients)
            return

        let total = recipients?.count || 0
        let sent = recipients?.status_counts.sent || 0
        let error = recipients?.status_counts.error || 0
        let pending = recipients?.status_counts.pending || 0

        //console.log('sent = ' + sent)
        //console.log('total = ' + total)

        setMessageStats({
            delivery: sent === 0 ? 0 : Math.round(sent / total * 100),
            total,
            sent,
            error,
            pending,
        })
    }, [recipients])

    // console.log(message)
    // console.log(recipients)

    // console.log(message.media)
    // console.log(message.media_placeholder)

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

        //console.log(mediaFiles)

        return {
            ...message.media_placeholder,
            media: mediaFiles
        }
    }

    // const mediaPlaceholder = useMemo(() => {

    // }, [message, recipients])

    // console.log(hasMedia)
    // console.log(hasMediaPlaceholder)
    // console.log(showMedia)
    console.log(recipients)
    
    return (
        <Grid className="MessagePreview-Container" container style={style}>
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
                        value={getMessageStatusLabel(message.status, message.platform?.name, recipients)}
                        status={message.status}
                    />
                    <Details label="Sender" value={getMessageSenderLabel(message)} />
                    <Details label="Recipient(s)" value={getRecipientsLabel(message)} />
                    {/* <Details label="Recipient(s)" labelArray value={getMessageRecipientsLabelArray(recipients)}/> */}
                    <Details label="Send As" value={getMessagePlatformLabel(message.platform)} />
                    <Details label="Start Sending At" value={message.first_sent_at ? formatDate(message.first_sent_at, 'medium', 'short') : '--'} />
                    <Details label="Tags" value={message.tags || '--'} />

                    <Details label="Message Text" textArea value={message.body} direction="column" style={{ marginTop: 10 }} />
                </div>
                <Grid item >
                    <h3>Message Stats</h3>

                    {messageStats && (
                        <Grid container direction="column" alignItems="center" style={{ marginTop: 10, marginBottom: 30 }}>
                            <Typography size={26} weight="bold" text={`${messageStats.delivery}%`} />
                            <Typography text={`Delivery Rate (${messageStats.sent}/${messageStats.total})`} />
                        </Grid>
                    )}


                    {link && <NavLink to={`${messageRoutes.details}/${message.id}`}>View Details</NavLink>}
                </Grid>
            </Grid>

            {!mini && <Label label={`Queud by ${getFullName(message.sender)} at ${formatDate(message.created_at, 'medium', 'short')}`} />}
        </Grid>
    )
}

export default MessagePreview

// https://stakdsocial.s3.us-east-2.amazonaws.com/variants/q896zrr42f5zxwz5401cifq9gdmc/fc137cc3f943a2fb62d27a291a775bb96286eeaa79ece24ddc4daf9515b11723?response-content-disposition=inline%3B%20filename%3D%22rsweb-message.png%22%3B%20filename%2A%3DUTF-8%27%27rsweb-message.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220520%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220520T175218Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=6fc5249be04f6f06b46552661cbb367446b344f7e881c358254e2f707dc3943c

// https://stakdsocial.s3.us-east-2.amazonaws.com/variants/j3unrjgqooyvhbw04v6eovyp8qxl/fc137cc3f943a2fb62d27a291a775bb96286eeaa79ece24ddc4daf9515b11723?response-content-disposition=inline%3B%20filename%3D%22rsweb-message.png%22%3B%20filename%2A%3DUTF-8%27%27rsweb-message.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220520%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220520T170242Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=d4f37780c8a08657cd480f8b10abb79aa6ddfe795aa66ca69b0c80b29ef58899