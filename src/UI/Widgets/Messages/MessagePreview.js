import './MessagePreview.css'

import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Grid } from "@material-ui/core"

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

const MessagePreview = ({ message, mini = false, style, link = false }) => {
    if(!message) return <></>

    console.log(message.media)

    const hasMedia = (message.media && Object.keys(message.media).length > 0)
        || message.media_placeholder && Object.keys(message.media_placeholder).length > 0

    return (
        <Grid className="MessagePreview-Container" container direction="column" style={style}>
            <Grid container direction="row" style={{ marginBottom: 20 }}>
                {hasMedia && (
                    <div className="MessagePreview-MediaPanel">
                    
                    </div>
                )}
                <div className="MessagePreview-DetailsPanel">
                    <h3>Message Details</h3>

                    <Details
                      label="Message Status"
                      value={getMessageStatusLabel(message.status)}
                      status={getMessageStatusLabel(message.status)}
                    />
                    <Details label="Send As" value={getMessagePlatformLabel(message.platform)}/>
                    <Details label="Sender" value={getMessageSenderLabel(message)}/>
                    <Details label="Recipient(s)" labelArray value={getMessageRecipientsLabelArray(message.recipients)}/>
                    <Details label="Start Sending At" value={formatDate(message.send_at, 'medium', 'short')}/>
                    <Details label="Tags" value={message.tags || '--'}/>

                    <Details label="Message Text" textArea value={message.body} direction="column" style={{ marginTop: 10 }}/>
                </div>
                {link && <NavLink to={`${messageRoutes.details}/${message.id}`}>View Details</NavLink>}
            </Grid>
            
            {!mini && <Label label={`Queud by ${getFullName(message.sender)} at ${formatDate(message.created_at, 'medium', 'short')}`}/>}
        </Grid>
    )
} 

export default MessagePreview