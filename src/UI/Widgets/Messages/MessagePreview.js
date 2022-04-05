import './MessagePreview.css'

import { useState, useEffect, useRef, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { Grid } from "@material-ui/core"

import MediaPreview from 'UI/Widgets/Media/MediaPreview'
import Typography from 'UI/Widgets/Typography'

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

const Label = ({ label }) => (
    <span className="MessagePreview-Label">{label}</span>
)

const Details = ({ label, value, status, direction = 'row', style, labelArray = false, textArea = false }) => {
    let detailClass = textArea ? 'MessageDetailTextArea' : 'MessageDetailValue'

    // if(textArea)
    //     detailClass += ' TextArea'

    return (
        <Grid container direction={direction} style={style}>
            <span className="DetailLabel">{label}:</span>
            {labelArray ?
                value.map(item => (
                    <span   style={{marginRight: '0.2em'}}
                      className={status ? `MessageDetailValue ${removeSpaces(status)}` : 'MessageDetailValue'}
                    >  
                        {item}
                    </span>
                ))
            :   (
                <span
                  className={status ? `${detailClass} ${removeSpaces(status)}` : detailClass}
                >  
                    {value}
                </span>
            )}
        </Grid>
    )
}

const MessagePreview = ({ message, recipients, mini = false, style, link = false }) => {
    if(!message) return <></>

    const [messageStats, setMessageStats] = useState(null)

    useEffect(() => {
        if(!recipients)
            return

        let total = recipients?.count || 0
        let sent = recipients?.status_counts.sent || 0
        let error = recipients?.status_counts.error || 0
        let pending = recipients?.status_counts.pending || 0

        console.log('sent = ' + sent)
        console.log('total = ' + total)

        setMessageStats({
            delivery: sent === 0 ? 0 : Math.round(sent / total * 100),
            total,
            sent,
            error,
            pending,
        })
    }, [recipients])

    // console.log(message.media)

    const hasMedia = useMemo(() => objectNotNull(message.item?.media), [message.item])
    const hasMediaPlaceholder = useMemo(() => objectNotNull(message.item?.media_placeholder), [message.item])

    const showMedia = hasMedia || hasMediaPlaceholder

    return (
        <Grid className="MessagePreview-Container" container direction="column" style={style}>
            <Grid container direction="row" style={{ marginBottom: 20 }}>
                {showMedia && (
                    <div className="MessagePreview-MediaPanel">
                        <MediaPreview
                          containerStyle={{ marginLeft: 15, marginRight: 15 }}
                          type={hasMedia ? 'media' : 'placeholder'}
                          media={hasMedia ? message.media : message.media_placeholder}/>
                    </div>
                )}
                <div className="MessagePreview-DetailsPanel">
                    <h3>Message Details</h3>

                    <Details
                      label="Status"
                      value={getMessageStatusLabel(message.status)}
                      status={getMessageStatusLabel(message.status)}
                    />
                    <Details label="Sender" value={getMessageSenderLabel(message)}/>
                    <Details label="Recipient(s)" labelArray value={getMessageRecipientsLabelArray(recipients)}/>
                    <Details label="Send As" value={getMessagePlatformLabel(message.platform)}/>
                    <Details label="Start Sending At" value={formatDate(message.send_at, 'medium', 'short')}/>
                    <Details label="Tags" value={message.tags || '--'}/>

                    <Details label="Message Text" textArea value={message.body} direction="column" style={{ marginTop: 10 }}/>
                </div>
                <Grid item direction="column">
                    <h3>Message Stats</h3>

                    {messageStats && (
                        <Grid container direction="column" alignItems="center" style={{ marginTop: 10, marginBottom: 30 }}>
                            <Typography size={26} weight="bold" text={`${messageStats.delivery}%`}/>
                            <Typography text={`Delivery Rate (${messageStats.sent}/${messageStats.total})`}/>
                        </Grid>
                    )}
                    
                    
                    {link && <NavLink to={`${messageRoutes.details}/${message.id}`}>View Details</NavLink>}
                </Grid>
            </Grid>
            
            {!mini && <Label label={`Queud by ${getFullName(message.sender)} at ${formatDate(message.created_at, 'medium', 'short')}`}/>}
        </Grid>
    )
} 

export default MessagePreview