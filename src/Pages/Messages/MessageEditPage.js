import { useState, useRef, useEffect } from 'react'

import MessageCreatePage from './MessageCreatePage'

import { useMessage, useMessageRecipients } from 'Api/Hooks'

const MessageEditPage = (props) => {
    const messageId = useRef(props.match.params.id)

    const message = useMessage(messageId.current, 1, 1000)
    const recipients = useMessageRecipients(messageId.current, false)
    // Platform
    const [platformSelected, setPlatformSelected] = useState(null)

    // Sender
    const [senderSelected, setSenderSelected] = useState([])

    // Receiver
    const [recipientSelected, setRecipientSelected] = useState()

    // Time
    const [sendAt, setSendAt] = useState(null)

    // Media
    const [mediaSelected, setMediaSelected] = useState(null)

    // TextArea
    const [textMessage, setTextMessage] = useState('')

    // Platform
    useEffect(() => {
        if(!message.item || !message.item.platform)
            return
        
        console.log(message.item)

        let platform = message.item.platform.name
        let selectedPlatform = null

        if(platform === 'Twitter')
            selectedPlatform = 'Twitter Dm'
        else if(platform === 'Rs Text')
            selectedPlatform = 'Rs Text'
        else
            selectedPlatform = 'Personal Text'

        setPlatformSelected(selectedPlatform)

    }, [message.item])

    // Sender
    useEffect(() => {
        if(!message.item)
            return

        let sender = message.item.sender

        if(sender)
            setSenderSelected([sender])

    }, [message.item])

    // Recipient
    useEffect(() => {
        if(!recipients.items)
            return

        //let recipients = recipients.item
        let selected = {
            contacts: [],
            teamBoards: [],
            privateBoards: [],
            recipients: []
        }

        if(recipients.items.contact_list)
            selected.contacts = recipients.items.contact_list

        if(recipients.items.filter_list) {
            recipients.items.filter_list.forEach(filter => {
                selected.teamBoards.push({ id: filter.id, name: filter.name })
            })
        }


        // let recipients = {
            // contacts: array of contacts,
            // privateBoards: array of private boards,
            // boards: array of boards
        // }

        setRecipientSelected(selected)

    }, [recipients.items])

    // Send At
    useEffect(() => {
        if(!message.item)
            return

        let sendAt = message.item.send_at

        setSendAt(sendAt)

    }, [message.item])

    // Media
    useEffect(() => {
        if(!message.item)
            return

        let media = message.item.media

        if(media && Object.keys(media).length > 0)
            setMediaSelected({
                item: media,
                type: 'media'
            })

    }, [message.item])

    // Media Placeholder
    useEffect(() => {
        if(!message.item)
            return

        let placeholder = message.item.media_placeholder

        if(placeholder && Object.keys(placeholder).length > 0)
            setMediaSelected({
                item: placeholder,
                type: 'placeholder'
            })

    }, [message.item])

    // Message Text
    useEffect(() => {
        if(!message.item)
            return

        let body = message.item.body

        if(body)
            setTextMessage(body)

    }, [message.item])

    return (
        <MessageCreatePage
          messageId={messageId.current}
          platformSelected={platformSelected}
          senderSelected={senderSelected}
          recipientSelected={recipientSelected}
          sendAt={sendAt}
          mediaSelected={mediaSelected}
          textMessage={textMessage}
          loading={message.loading}
          edit
        />
    )
}

export default MessageEditPage