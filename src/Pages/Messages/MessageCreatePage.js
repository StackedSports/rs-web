import { useState, useEffect, useRef } from 'react'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check'
import SendIcon from '@mui/icons-material/Send'

import MainLayout from 'UI/Layouts/MainLayout'
import MessageInput from 'UI/Forms/Inputs/MessageInput'

import ReceiverSelectDialog, { tabs as receiverDialogTabs } from 'UI/Widgets/Messages/ReceiverSelectDialog'
import MediaSelectDialog from 'UI/Widgets/Media/MediaSelectDialog'
import DateTimePicker from 'UI/Widgets/DateTimePicker'

import useArray from 'Hooks/ArrayHooks'


import { useUser, useTeamMembers, useTextPlaceholders, useSnippets } from 'Api/Hooks'
import { getBoards, getBoard, filterContacts, createMessage } from 'Api/Endpoints'
import { updateContact } from 'ApiHelper'

import { 
    coachTypes, 
    isSelectedCoachType, 
    getCoachValue,
    getRecipientSelectedBoards,
    getRecipientSelectedContacts
} from 'utils/Data'
import { formatDate } from 'utils/Parser'

import { messageRoutes } from 'Routes/Routes'

const filters = [
    { // Category
        id: '0',
        name: 'Messages',
        items: [
            // Filters
            { id: '0', name: 'Scheduled' },
            { id: '1', name: 'In Progress' },
            { id: '2', name: 'Finished' },
            { id: '3', name: 'Archived' },
        ]
    }
]

export default function MessageCreatePage() {
    const [loading, setLoading] = useState(false)
    // const contacts = useContacts()
    // const ranks = useRanks()
    const [teamMembers] = useTeamMembers()
    // const tags = useTags()
    // const contact = useContact('mkjXBTMWnmPX')

    // Platform
    const [platformSelected, setPlatformSelected] = useState(null)

    // Sender
    const [sendContacts, setSendContacts] = useState(null)
    const [senderSelected, setSenderSelected] = useArray()

    // Receiver
    const [recipientSelected, setRecipientSelected] = useState()
    const [showReceiverDialog, setShowReceiverDialog] = useState(false)
    const [receiverDialogTab, setReceiverDialogTab] = useState(receiverDialogTabs.teamBoard)
    // variable to let the ReceiverSelectDialog knows it needs to remove certain selected items
    // from its own selection state
    const [receiverRemoved, setReceiverRemoved] = useState(null)

    // Time
    const [sendAt, setSendAt] = useState('ASAP')
    const [showTimePicker, setShowTimePicker] = useState(false)

    // Media
    const [showMediaDialog, setShowMediaDialog] = useState(false)
    const [mediaSelected, setMediaSelected] = useState(null)
    const [mediaRemoved, setMediaRemoved] = useState(null)

    // TextArea
    // const textArea = useRef(null)
    const [message, setMessage] = useState('')
    const snippets = useSnippets()
    const textPlaceholders = useTextPlaceholders()

    // Error
    const [error, setError] = useState({
        show: false,
        message: 'This is an error'
    })

    const [redirect, setRedirect] = useState('')

    // console.log(snippets)
    // console.log(textPlaceholders)

    useEffect(() => {
        if(!teamMembers)
            return
        
        setSendContacts(coachTypes.concat(teamMembers))

    }, [teamMembers])

    // console.log(teamMembers)

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    

    const onFilterSelected = (filter, filterIndex, categoryIndex) => {
        console.log('Filter ' + filters[categoryIndex].items[filterIndex].name + ' selected from ' + filters[categoryIndex].name)
    }

    const onPlatformSelected = (platform, index) => {
        console.log('platform selected = ' + platform)
        setPlatformSelected(platform)
    }

    const onPlatformRemove = () => {
        setPlatformSelected(null)
    }

    const onSenderSelected = (sender) => {
        if(typeof sender == 'string') {
            // console.log('sender = ' + sender)

            if(senderSelected.length == 0)
                return setSenderSelected.push(sender)
            else {
                let index = -1

                senderSelected.every((selected, i) => {
                    if(isSelectedCoachType(selected)) {
                        index = i
                        return false
                    }

                    return true
                })

                // console.log(index)
                
                if(index === -1)
                    setSenderSelected.unshift(sender)
                else
                    setSenderSelected.put(sender, index)
                
            }
        } else {
            // console.log('sender id = ' + sender.id)

            if(senderSelected.length == 0)
                return setSenderSelected.push(sender)
            else {
                let index = -1

                senderSelected.every((selected, i) => {
                    if(!isSelectedCoachType(selected)) {
                        index = i
                        return false
                    }

                    return true
                })

                // console.log(index)
                
                if(index === -1)
                    setSenderSelected.push(sender)
                else
                    setSenderSelected.put(sender, index)
                
            }
        }
    }

    const onSenderRemove = (index) => {
        setSenderSelected.remove(index)
    }

    const onReceiverSelected = (selectedPrivateBoards, selectedTeamBoards, selectedContacts) => {
        setRecipientSelected({
            privateBoards: selectedPrivateBoards,
            teamBoards: selectedTeamBoards,
            contacts: selectedContacts
        })
        setShowReceiverDialog(false)
    }

    const onReceiverSelectedClick = (index, type) => {
        console.log('Clicked on ' + index + ' from ' + type)
        setReceiverDialogTab(receiverDialogTabs[type])
        setShowReceiverDialog(true)
    }

    const onRemoveReceiver = (index, id, type, e) => {
        e.stopPropagation()
        console.log('Remove ' + index + ' from ' + type)

        // pass down index, id, and type to receiverRemovedItems so the dialog can handle
        // their removal from its selection. For this component
        setReceiverRemoved({ type, id, index })

        let tmp = Object.assign({}, recipientSelected)

        if(index === 'all') {
            // If index is equal all, it means we need to remove all the selected items
            tmp[type] = []
        } else {
            // We can just use the index and type to remove the item from the recipientSelected object 
            tmp[type].splice(index, 1)
        }
        
        setRecipientSelected(tmp)
    }

    const onMediaSelected = (item, type) => {
        setMediaSelected({
            item,
            type
        })
        setMediaRemoved('')
        setShowMediaDialog(false)
    }

    const onMediaSelectedClick = (e) => {
        setShowMediaDialog(true)
    }

    const onRemoveMedia = (e) => {
        e.stopPropagation()
        setMediaRemoved(mediaSelected.item.id)
        setMediaSelected(null)
    }

    const onDateTimeSave = (date) => {
        // date = 'ASAP' or UTC Date
        setSendAt(date)
        setShowTimePicker(false)
    }

    const onTextAreaChange = (value) => {
        setMessage(value)
    }

    const onSaveCloseClick = () => {
        console.log('save and close')
    }

    const onPreviewSendClick = () => {
        console.log('preview and send')

        // let send = new Date(Date.now() + 1000 * 60 * 60)
        // console.log(send)

        // console.log(platformSelected)
        // console.log(senderSelected)
        // console.log(recipientSelected)
        // console.log(message)
        // console.log(mediaSelected)
        // console.log(sendAt)

        let messageData = {}

        if(platformSelected) {
            messageData['platform'] = platformSelected
        } else {
            // throw error
            return showErrorMessage('You must select a Platform')
        }

        if(senderSelected && senderSelected.length > 0) {
            // Sender is optional. If no sender is selected, message will be sent as current user.
            // On the other hand, sender can be set to a coach type or team member id. Coach selected
            // will always be at senderSelected index 0. So we can test to see if the item at index
            // 0 is of type string. If so, we need to add send_as_coach to messageData, interpolating
            // for each type. Field send_as_coach accepts 'area', 'recruiting', or 'coordinator'.
            //
            // If senderSelected index 1 contains a team member obj, then we need to also add a
            // user_id field to messageData with the selected team member id.

            if(typeof senderSelected[0] === 'string') {
                // This selection is a type of coach. Add coach value to messageData
                messageData['send_as_coach'] = getCoachValue(senderSelected[0])
            } else if(senderSelected[0].id) { // && senderSelected[0].role && senderSelected[0].team) {
                // If selection is a team member
                // It would be a good idea if we could test to see if the selection is in fact
                // a team member. Altough I believe that is already done in the server
                messageData['user_id'] = senderSelected[0].id
            }

            // Test second selected
            if(senderSelected[1] && senderSelected[1].id) { // && senderSelected[1].role && senderSelected[1].team) {
                messageData['user_id'] = senderSelected[1].id
            }
        } else {
            // We are requiring this field so it becomes more clear to the user who is being set
            // as the sender of the message
            return showErrorMessage('You must add a Sender')
        }

        if(recipientSelected) {
            // Recipients is required. It needs to be either boards or contacts. It can also be both.
            // The messageData requires a comma delimited list of strings of ids, for both boards
            // or contacts. To send the boards, we use filter_ids field. For contacts, contact_ids.
            let contactsSelected = getRecipientSelectedContacts(recipientSelected)
            let boardsSelected = getRecipientSelectedBoards(recipientSelected)

            // console.log(`contacts = ${contactsSelected}`)
            // console.log(`boards = ${boardsSelected}`)
            
            // If both lists are empty, throw an error
            if(contactsSelected === '' && boardsSelected === '')
                return showErrorMessage('You must add at least one Recipient')

            // Add contacts list if it's not empty
            if(contactsSelected !== '')
                messageData['contact_ids'] = contactsSelected
            
            // Add boards list if it's not empty
            if(boardsSelected !== '')
                messageData['filter_ids'] = boardsSelected

        } else {
            // Throw error
            return showErrorMessage('You must add at least one Recipient')
        }

        if(sendAt) {
            // Send at is optional. If no send_at field is provided to messageData, the server
            // will try to send the message right away. In the client, sendAt can either be
            // 'ASAP' or a js Date.

            // Only add send_at if our selection is an object of type Date
            if(Object.prototype.toString.call(sendAt) === '[object Date]')
                messageData['send_at'] = sendAt
        }

        // Message requires either a body or media attachment. They can't be both empty
        if(message === '' && !mediaSelected)
            return showErrorMessage('Message must either have a Text Message or a Media attachment')
        
        if(message !== '') {
            // Adds message as body to messageData
            messageData['body'] = message
        }

        if(mediaSelected) {
            // Our mediaSelected is an object containing a type 'media' || 'placeholder' and
            // the actual item of its respective type.

            if(mediaSelected.type === 'media')
                messageData['media_id'] = mediaSelected.item.id
            else if(mediaSelected.type === 'placeholder')
                messageData['media_placeholder_id'] = mediaSelected.item.id
        }

        console.log(messageData)
        
        setLoading(true)

        createMessage(messageData)
            .then(result => {
                console.log(result)
                let message = result.data
                setRedirect(`${messageRoutes.details}/${message.id}`)

                // {"errors":[{"code":"no_method","message":"undefined method `id' for nil:NilClass"}]}
            })
            .catch(error => {
                console.log(error)
                showErrorMessage('Something went wrong. We could not create your message')
            })
            .finally(() => setLoading(false))
    }

    const showErrorMessage = (message) => {
        setError({
            show: true,
            message
        })
    }

    const onErrorClose = (e) => {
        setError(error => ({ ...error, show: false }))
    }

    // console.log(senderSelected)

    const panelActions = [
        { name: 'Save & Close', variant: 'outlined', icon: CheckIcon, onClick: onSaveCloseClick },
        { name: 'Preview & Send', variant: 'contained', icon: SendIcon, onClick: onPreviewSendClick }

    ]

    let platformOptions = []

    // if()
    

    return (
        <MainLayout
          title='Create Message'
          topActionName='+ New Message'
          onTopActionClick={onTopActionClick}
          filters={filters}
          actions={panelActions}
          redirect={redirect}
          loading={loading}
          onFilterSelected={onFilterSelected}
        >
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={error.show}
              autoHideDuration={6000}
              onClose={onErrorClose}>
                <MuiAlert variant="filled" onClose={onErrorClose} severity="error" sx={{ width: '100%' }}>
                    {error.message}
                </MuiAlert>
            </Snackbar>

            <ReceiverSelectDialog
              open={showReceiverDialog}
              currentTab={receiverDialogTab}
              removedItem={receiverRemoved}
              onSelected={onReceiverSelected}
              onClose={() => setShowReceiverDialog(false)}
            />

            <DateTimePicker
              open={showTimePicker}
              onSave={onDateTimeSave}
              onClose={() => setShowTimePicker(false)}
            /> 

            <MediaSelectDialog
              open={showMediaDialog}
              removedItem={mediaRemoved}
              onSelected={onMediaSelected}
              onClose={() => setShowMediaDialog(false)}
            />

            <MessageInput
              type='platform'
              label='Send as:'
              selected={platformSelected}
              onSelected={onPlatformSelected}
              onRemove={onPlatformRemove}
            />
            <MessageInput
              type='sender'
              label='Send from:'
              name='Add Sender'
              contacts={sendContacts}
              selected={senderSelected}
              onSelected={onSenderSelected}
              onRemove={onSenderRemove}
              canAddMore={senderSelected.length < 2}
            />

            <MessageInput
              type='receiver' 
              label='Send to:' 
              name='Add Recipient' 
              selected={recipientSelected}
              onSelectedClick={onReceiverSelectedClick}
              onRemove={onRemoveReceiver}
              onClick={() => setShowReceiverDialog(true)}
            />

            <MessageInput
              type='time'
              label='Begin Sending At:'
              name={sendAt === 'ASAP' ? sendAt : formatDate(sendAt, 'full', 'short')}
              onClick={() => setShowTimePicker(true)}
            />

            <MessageInput
              type='media'
              label='Add Media:'
              selected={mediaSelected}
              onSelectedClick={onMediaSelectedClick}
              onRemove={onRemoveMedia}
              onClick={() => setShowMediaDialog(true)}
            />

            <MessageInput
              type='text'
              label='Message Text:'
              placeholder='Type your message here'
              snippets={snippets}
              textPlaceholders={textPlaceholders}
              value={message}
              onChange={onTextAreaChange}
              />
            
            <div style={{ marginBottom: 50 }}/>
        </MainLayout>
    )
}