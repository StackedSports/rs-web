import { useState, useEffect, useRef, useContext } from 'react'

import { useParams } from "react-router-dom"
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'
import SendIcon from '@mui/icons-material/Send'

import BaseMessagePage from './BaseMessagePage'
import MessageInput from 'UI/Forms/Inputs/MessageInput'

import ReceiverSelectDialog, { tabs as receiverDialogTabs } from 'UI/Widgets/Messages/ReceiverSelectDialog'
import MediaSelectDialog from 'UI/Widgets/Media/MediaSelectDialog'
import DateTimePicker from 'UI/Widgets/DateTimePicker'

import { AppContext } from 'Context/AppProvider'
import { AuthContext } from 'Context/Auth/AuthProvider'

import useArray from 'Hooks/ArrayHooks'

import { useTeamMembers, useSnippets, useMediaMutation, useTextPlaceholders } from 'Api/ReactQuery'
import {
    createMessage,
    updateMessage,
} from 'Api/Endpoints'
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
import { object } from 'yup'
import { platform } from 'chart.js'

const ALL_PLATFORMS = {
    twitter: true,
    rs: true,
    txt: true
}

export default function MessageCreatePage(props) {
    const { user } = useContext(AuthContext)
    const app = useContext(AppContext)
    const { control } = useParams()
    const teamMembers = useTeamMembers()
    const { create: uploadMedia } = useMediaMutation()

    const [loading, setLoading] = useState(false)

    // Platform
    const [platforms, setPlatforms] = useState(ALL_PLATFORMS)

    const [platformSelected, setPlatformSelected] = useState(props.platformSelected || null)

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
    const [mediaSelected, setMediaSelected] = useState(null)
    const [mediaRemoved, setMediaRemoved] = useState(null)
    const [showMediaDialog, setShowMediaDialog] = useState(false)
    const [uploadingMedia, setUploadingMedia] = useState(false)

    // TextArea
    // const textArea = useRef(null)
    const [textMessage, setTextMessage] = useState('')
    const snippets = useSnippets().items
    const textPlaceholders = useTextPlaceholders().items

    // Error
    const [error, setError] = useState({
        show: false,
        message: 'This is an error'
    })

    const [redirect, setRedirect] = useState('')

    useEffect(() => {
        if (!control)
            return

        console.log(control)

        let payload = JSON.parse(localStorage.getItem('new-message-payload'))

        console.log(payload)

        // return
        let newRecipients = []
        let newContacts = []
        let newPrivateBoards = []
        let newTeamBoards = []

        if (payload.recipients) {
            newRecipients = payload.recipients
        }

        if (payload.contacts) {
            newContacts = payload.contacts
        }

        if (payload.privateBoard) {
            newPrivateBoards.push(payload.privateBoard)
        }

        if (payload.teamBoard) {
            newTeamBoards.push(payload.teamBoard)
        }

        if (payload.media) {
            setMediaSelected(payload.media)
        }

        setRecipientSelected({
            privateBoards: newPrivateBoards,
            teamBoards: newTeamBoards,
            contacts: newContacts,
            recipients: newRecipients
        })

        return

    }, [control])

    useEffect(() => {
        if (props.platformSelected)
            setPlatformSelected(props.platformSelected)

    }, [props.platformSelected])

    useEffect(() => {
        if (props.senderSelected)
            setSenderSelected.all(props.senderSelected)

    }, [props.senderSelected])

    // Recipients from Props
    useEffect(() => {
        //console.log(props.recipientSelected)

        if (props.recipientSelected)
            setRecipientSelected(props.recipientSelected)

    }, [props.recipientSelected])

    useEffect(() => {
        if (props.sendAt)
            setSendAt(props.sendAt)

    }, [props.sendAt])

    // Media from Props
    useEffect(() => {
        if (props.mediaSelected)
            setMediaSelected(props.mediaSelected)

    }, [props.mediaSelected])

    useEffect(() => {
        if (props.textMessage)
            setTextMessage(props.textMessage)

    }, [props.textMessage])

    useEffect(() => {
        // console.log(teamMembers.items)

        if (!teamMembers.items)
            return

        setSendContacts(coachTypes.concat(teamMembers.items))

    }, [teamMembers.items])

    useEffect(() => {
        if (senderSelected.length === 0)
            setPlatforms(ALL_PLATFORMS)
        else {
            validatePlatform(senderSelected)
        }
    }, [senderSelected, setPlatforms])

    const onPlatformSelected = (platform, index) => {
        console.log('platform selected = ' + platform)
        setPlatformSelected(platform)
    }

    const onPlatformRemove = () => {
        setPlatformSelected(null)
    }

    const validatePlatform = (senders) => {
        // We need to validate available platforms for the message
        // based on sender selection.

        // If the user selects a team members as the sender, we need to
        // check the team member properties to see if they have a twitter
        // account to send Twitter Dms, and a phone number to send Personal
        // Texts, and SMS phone for Rs Text.

        // Further, depending on wether or not the sender selection
        // already contains a Coach, we need to merge both possible platforms
        // to accomodate for the coache's possible message types.

        // If only selection is a coach type, we need to clear the available platforms
        // and inform the user
        const newAvailablePlatforms = {}

        if (senders.some(sender => typeof sender === 'string'))
            newAvailablePlatforms['twitter'] = true
        else {
            if (senders.some(sender => sender?.twitter_profile?.screen_name))
                newAvailablePlatforms['twitter'] = true
            if (senders.some(sender => sender?.phone))
                newAvailablePlatforms['txt'] = true
            if (senders.some(sender => sender?.sms_number))
                newAvailablePlatforms['rs'] = true
        }

        checkSelectedPlatform(newAvailablePlatforms)
        setPlatforms(newAvailablePlatforms)
    }

    function checkSelectedPlatform(availablePlatforms) {
        if (platformSelected) {
            const selectedPlatf = (() => {
                switch (platformSelected) {
                    case 'Twitter Dm': return 'twitter'
                    case 'SMS/MMS': return 'rs'
                    default: return 'txt'
                }
            })()
            if (!availablePlatforms || !availablePlatforms[selectedPlatf]) {
                setPlatformSelected(null)
            }
        }
    }

    const onSenderSelected = (sender) => {

        console.log(sender)

        if (typeof sender == 'string') {
            // console.log('sender = ' + sender)

            if (senderSelected.length == 0)
                return setSenderSelected.push(sender)
            else {
                let index = -1
                // let index = getCoachIndex()

                senderSelected.every((selected, i) => {
                    if (isSelectedCoachType(selected)) {
                        index = i
                        return false
                    }

                    return true
                })

                // console.log(index)

                if (index === -1)
                    setSenderSelected.unshift(sender)
                else
                    setSenderSelected.put(sender, index)

            }
        } else {
            // console.log('sender id = ' + sender.id)

            if (senderSelected.length == 0)
                setSenderSelected.push(sender)
            else {
                let index = -1
                // let index = getCoachIndex()

                senderSelected.every((selected, i) => {
                    if (!isSelectedCoachType(selected)) {
                        index = i
                        return false
                    }

                    return true
                })

                // console.log(index)

                if (index === -1)
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
        console.log(selectedContacts)
        setRecipientSelected({
            privateBoards: selectedPrivateBoards,
            teamBoards: selectedTeamBoards,
            contacts: selectedContacts,
            recipients: recipientSelected?.recipients || []
        })
        setShowReceiverDialog(false)
    }

    const onReceiverSelectedClick = (index, type) => {
        console.log('Clicked on ' + index + ' from ' + type)

        if (type === 'recipients')
            return

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

        if (index === 'all') {
            // If index is equal all, it means we need to remove all the selected items
            tmp[type] = []
        } else {
            // We can just use the index and type to remove the item from the recipientSelected object 
            tmp[type].splice(index, 1)
        }

        //console.log(tmp)

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
    const onUploadMedia = (file) => {
        const media = {
            file: file,
            owner: user.id
        }

        uploadMedia(media, {
            onSuccess: (res) => {
                app.alert.setSuccess("Uploaded media successfully!")
                console.log(res)
                onMediaSelected(res, "media")
            },
            onError: (error) => {
                app.alert.setError("Failed to upload media.")
                console.log(error)
            },
            onSettled: () => setUploadingMedia(false),
        })
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
        setTextMessage(value)
    }

    const onSaveCloseClick = () => {
        console.log('save and close')

        onCreateMessage('save')
    }

    const onPreviewSendClick = () => {
        console.log('preview and send')

        onCreateMessage('preview')
    }

    const onCreateMessage = (control) => {
        console.log('create message: ' + control)

        if (loading)
            return

        if (control !== 'save' && control !== 'preview')
            return

        const save = control === 'save'

        // let send = new Date(Date.now() + 1000 * 60 * 60)
        // console.log(send)

        // console.log(platformSelected)
        // console.log(senderSelected)
        // console.log(recipientSelected)
        // console.log(message)
        console.log(mediaSelected)
        // console.log(sendAt)

        // return

        let messageData = {}

        // messageData = {
        //     contact_ids: ['wjYkOvlTvgVB', 'yBPRjbTGjPMY', 'xMgndzTlZpXK'],
        //     platform: "Personal Text",
        //     user_id: "vebEQEiMPqbl",
        //     body: 'Hey'
        // }

        // console.log(messageData)

        // createMessage(messageData)
        //     .then(result => {
        //         console.log(result)
        //         let message = result.data

        //         if(save)
        //             setRedirect(`${messageRoutes.all}`)
        //         else
        //             setRedirect(`${messageRoutes.details}/${message.id}`)

        //         // {"errors":[{"code":"no_method","message":"undefined method `id' for nil:NilClass"}]}
        //     })
        //     .catch(error => {
        //         console.log(error)

        //         if(save)
        //             showErrorMessage('We could not save your message')
        //         else
        //             showErrorMessage('Something went wrong. We could not create your message')
        //     })
        //     .finally(() => setLoading(false))

        // return

        // Twitter, SMS, Personal Text

        if (platformSelected) {

            const getPlatf = (plat) => {
                switch (plat) {
                    case 'Twitter Dm': return 'Twitter'
                    case 'SMS/MMS': return 'RS Text'
                    default: return plat
                }
            }


            messageData['platform'] = getPlatf(platformSelected)
        } else {
            // throw error
            return showErrorMessage('You must select a Platform')
        }

        if (senderSelected && senderSelected.length > 0) {
            // Sender is optional in the api. If no sender is selected, message will be sent as current user.
            // On the other hand, sender can be set to a coach type or team member id. Coach selected
            // will always be at senderSelected index 0. So we can test to see if the item at index
            // 0 is of type string. If so, we need to add send_as_coach to messageData, interpolating
            // for each type. Field send_as_coach accepts 'area', 'recruiting', or 'coordinator'.
            //
            // If senderSelected index 1 contains a team member obj, then we need to also add a
            // user_id field to messageData with the selected team member id.

            if (senderSelected.length === 1 && typeof senderSelected[0] === 'string') {
                return showErrorMessage('You must add a Sender in case the selected Coach is not available')
            }

            if (typeof senderSelected[0] === 'string') {
                // This selection is a type of coach. Add coach value to messageData
                messageData['send_as_coach'] = getCoachValue(senderSelected[0])
            } else if (senderSelected[0].id) { // && senderSelected[0].role && senderSelected[0].team) {
                // If selection is a team member
                // It would be a good idea if we could test to see if the selection is in fact
                // a team member. Altough I believe that is already done in the server
                messageData['user_id'] = senderSelected[0].id
            }

            // Test second selected
            if (senderSelected[1] && senderSelected[1].id) { // && senderSelected[1].role && senderSelected[1].team) {
                messageData['user_id'] = senderSelected[1].id
            }
        } else {
            // We are requiring this field so it becomes more clear to the user who is being set
            // as the sender of the message
            if (!save)
                return showErrorMessage('You must add a Sender')
        }

        if (recipientSelected) {
            // Recipients is required. It needs to be either boards or contacts. It can also be both.
            // The messageData requires a comma delimited list of strings of ids, for both boards
            // or contacts. To send the boards, we use filter_ids field. For contacts, contact_ids.
            let contactsSelected = getRecipientSelectedContacts(recipientSelected)
            let boardsSelected = getRecipientSelectedBoards(recipientSelected)

            // console.log(`contacts = ${contactsSelected}`)
            // console.log(`boards = ${boardsSelected}`)

            // If both lists are empty, throw an error
            if (contactsSelected === '' && boardsSelected === '')
                return showErrorMessage('You must add at least one Recipient')

            // Add contacts list if it's not empty
            if (contactsSelected !== '')
                messageData['contact_ids'] = contactsSelected

            // Add boards list if it's not empty
            if (boardsSelected !== '')
                messageData['filter_ids'] = boardsSelected

        } else {
            // Throw error
            return showErrorMessage('You must add at least one Recipient')
        }

        if (sendAt) {
            // Send at is optional. If no send_at field is provided to messageData, the server
            // will try to send the message right away. In the client, sendAt can either be
            // 'ASAP' or a js Date.

            // Only add send_at if our selection is an object of type Date
            if (Object.prototype.toString.call(sendAt) === '[object Date]')
                messageData['send_at'] = sendAt
        }

        // Message requires either a body or media attachment. They can't be both empty
        if (textMessage === '' && !mediaSelected)
            return showErrorMessage('Message must either have a Text Message or a Media attachment')

        if (textMessage !== '') {
            // Adds message as body to messageData
            messageData['body'] = textMessage
        }

        if (mediaSelected) {
            // Our mediaSelected is an object containing a type 'media' || 'placeholder' and
            // the actual item of its respective type.

            if (mediaSelected.type === 'media')
                messageData['media_id'] = mediaSelected.item.id.toString()
            else if (mediaSelected.type === 'placeholder')
                messageData['media_placeholder_id'] = mediaSelected.item.id.toString()
        }

        // delete messageData.user_id

        console.log(messageData)

        // return

        if (save && Object.keys(messageData).length === 0)
            return showErrorMessage(`Can't save an empty message`)

        setLoading(true)

        // const endpoint = props.edit ? updateMessage : createMessage

        if (props.edit) {
            console.log('Update Message')
            // return
            updateMessage(props.messageId, messageData)
                .then(result => {
                    console.log(result)
                    let message = result.data

                    if (save)
                        setRedirect(`${messageRoutes.all}`)
                    else
                        setRedirect(`${messageRoutes.details}/${props.messageId}`)

                    // {"errors":[{"code":"no_method","message":"undefined method `id' for nil:NilClass"}]}
                })
                .catch(error => {
                    console.log(error)

                    if (save)
                        showErrorMessage('We could not update your message')
                    else
                        showErrorMessage('Something went wrong. We could not update your message')
                })
                .finally(() => setLoading(false))

        } else {
            console.log('Create Message')
            // return
            createMessage(messageData)
                .then(result => {
                    console.log(result)
                    let message = result.data

                    if (save)
                        setRedirect(`${messageRoutes.all}`)
                    else
                        setRedirect(`${messageRoutes.details}/${message.id}`)

                    // {"errors":[{"code":"no_method","message":"undefined method `id' for nil:NilClass"}]}
                })
                .catch(error => {
                    console.log(error)

                    if (save)
                        showErrorMessage('We could not save your message')
                    else
                        showErrorMessage('Something went wrong. We could not create your message')
                })
                .finally(() => setLoading(false))
        }
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

    const handleImportFiles = (file) => {
        console.log(file)
        setUploadingMedia(true)

        if (((file.type.includes("/jpg") || file.type.includes("/jpeg") || file.type.includes("/png")) && file.size < 5000000)
            || ((file.type.includes("/pdf") || file.type.includes("/mp4")) && file.size < 15000000)) {
            // 5MB for image and 15MB for videos

            onUploadMedia(file)

        } else {
            setUploadingMedia(false)
            app.alert.setWarning("File not added because it does not match the file upload criteria")
            return
        }
    }

    const onDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length > 1) {
            app.alert.setWarning("It is not possible to select more than one media.")
        } else {
            handleImportFiles(e.dataTransfer.files[0])
        }
    }

    // console.log(senderSelected)

    const panelActions = [
        { name: 'Save & Close', variant: 'outlined', icon: CheckIcon, onClick: onSaveCloseClick },
        { name: 'Preview & Send', variant: 'contained', icon: SendIcon, onClick: onPreviewSendClick }

    ]


    return (
        <BaseMessagePage
            title='Create Message'
            topActionName='+ New Message'
            actions={panelActions}
            redirect={redirect}
            loading={loading || props.loading}
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
                uniqueSelection
                onSelected={onMediaSelected}
                onClose={() => setShowMediaDialog(false)}
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
                type='platform'
                label='Send as:'
                platforms={platforms}
                selected={platformSelected}
                onSelected={onPlatformSelected}
                onRemove={onPlatformRemove}
            />

            <MessageInput
                type='time'
                label='Begin Sending At:'
                name={sendAt === 'ASAP' ? sendAt : formatDate(sendAt, 'full', 'short')}
                onClick={() => setShowTimePicker(true)}
            />

            <MessageInput
                type='media'
                onDrop={onDrop}
                label='Add Media:'
                loading={uploadingMedia}
                selected={mediaSelected}
                onRemove={onRemoveMedia}
                browseAction={setShowMediaDialog}
                onSelectedClick={onMediaSelectedClick}
                onClick={() => setShowMediaDialog(true)}
            />

            <MessageInput
                type='text'
                label='Message Text:'
                placeholder='Type your message here'
                snippets={snippets}
                textPlaceholders={textPlaceholders}
                value={textMessage}
                onChange={onTextAreaChange}
                style={{ marginBottom: 50 }}
            />
        </BaseMessagePage>
    )
}