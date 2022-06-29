import { useContext, useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import { Divider, Stack } from '@mui/material';

import { tweetRoutes } from 'Routes/Routes';
import { AppContext } from 'Context/AppProvider';

import BaseTweetPage from "./BaseTweetPage";
import MessageInput from 'UI/Forms/Inputs/MessageInput';
import DateTimePicker from 'UI/Widgets/DateTimePicker';
import MediaSelectDialog from 'UI/Widgets/Media/MediaSelectDialog';
import { formatDate } from 'utils/Parser';
import { useUser } from 'Api/Hooks';
import { useSnippets, useTeamMembers, useMediaMutation } from 'Api/ReactQuery';

const TweetCreatePage = (props) => {
  const app = useContext(AppContext)
  const user = useUser()
  const snippets = useSnippets()
  const teamMembers = useTeamMembers({ has_twitter: true })
  const { create: uploadMedia } = useMediaMutation()

  const [sendAt, setSendAt] = useState('ASAP')
  const [postToSelected, setPostToSelected] = useState([])
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [uploadingMedia, setUploadingMedia] = useState(false)
  const [mediaSelected, setMediaSelected] = useState(null)
  const [showMediaDialog, setShowMediaDialog] = useState(false)
  const [mediaRemoved, setMediaRemoved] = useState(null)
  const [textMessage, setTextMessage] = useState('')
  const [loading, setLoading] = useState(false)


  const onTopActionClick = () => {

  }

  const onSaveAndCloseAction = () => {
    onCreateMessage('save')
  }

  const onPreviewAndPostAction = () => {
    console.log("onPreviewAndPostAction")
   app.redirect(tweetRoutes.details)
  }

  const onCreateMessage = (control) => {
    setLoading(true)
    const messageDataApi = {
      platform: 'Twitter',
    }

    if (control !== 'save' && control !== 'preview')
      return

    if (control === 'save') {

      if (typeof postToSelected[0] === String)
        messageDataApi.send_as_coach = postToSelected[0] === 'Area Coach' ? 'area' : 'recruiting'
      else if (postToSelected[0] && postToSelected[0].id)
        messageDataApi.user_id = postToSelected[0].id
      else
        return app.alert.setError("Please select a Post To")

      if (sendAt instanceof Date)
        messageDataApi.send_at = formatDate(sendAt)

      if (textMessage.trim().length > 0)
        messageDataApi.body = textMessage
      else if (mediaSelected) {
        if (mediaSelected.type === 'media')
          messageData.media_id = mediaSelected.item.id
        else if (mediaSelected.type === 'placeholder')
          messageData.media_placeholder_id = mediaSelected.item.id
      }
      else
        return app.alert.setError("Please enter a message or select a media")

      app.alert.setWarning("This functionality is not yet available")
    }
  }

  const actions = [
    /*    {
         name: 'More',
         icon: ArrowDropDownIcon,
         variant: 'outlined',
         type: 'dropdown',
         // disabled: ,
         options: [
           // { name: '', onClick:  },
         ]
       }, */
    {
      name: 'Save and Close',
      icon: CheckIcon,
      variant: 'outlined',
      onClick: onSaveAndCloseAction,
    },
    {
      name: 'Preview and Post',
      icon: SendIcon,
      variant: 'contained',
      onClick: onPreviewAndPostAction,
    }
  ]

  const onTextAreaChange = (value) => {
    setTextMessage(value)
  }

  const onPostToSelected = (selected) => {
    console.log(selected)
    setPostToSelected([selected])
  }

  const onDateTimeSave = (date) => {
    // date = 'ASAP' or UTC Date
    setSendAt(date)
    setShowTimePicker(false)
  }

  const onPostToRemove = () => {
    console.log('onPostToRemove')
    setPostToSelected([])
  }

  const onRemoveMedia = (e) => {
    e.stopPropagation()
    setMediaRemoved(mediaSelected.item.id)
    setMediaSelected(null)
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
      owner: user.item?.id
    }
    // console.log(media)

    uploadMedia(media, {
      onSuccess: (res) => {
        app.alert.setSuccess("Uploaded media successfully!")
        onMediaSelected(res, "media")
      },
      onError: (err) => {
        app.alert.setError("Failed to upload media.")
        console.log(err)
      },
      onSettled: () => {
        setUploadingMedia(false)
      }
    })
  }

  const onMediaSelectedClick = (e) => {
    setShowMediaDialog(true)
  }

  return (
    <BaseTweetPage
      title="Create Post"
      topActionName="+ New Post"
      onTopActionClick={onTopActionClick}
      actions={actions}
    >
      <Divider />

      <MediaSelectDialog
        open={showMediaDialog}
        removedItem={mediaRemoved}
        uniqueSelection
        onSelected={onMediaSelected}
        onClose={() => setShowMediaDialog(false)}
      />

      <DateTimePicker
        open={showTimePicker}
        onSave={onDateTimeSave}
        onClose={() => setShowTimePicker(false)}
      />

      <MessageInput
        type='sender'
        label='Post to:'
        name='Posting Account'
        contacts={teamMembers.items}
        selected={postToSelected}
        onSelected={onPostToSelected}
        onRemove={onPostToRemove}
        canAddMore={postToSelected.length === 0}
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
        placeholder='Type message'
        snippets={snippets.items}
        value={textMessage}
        onChange={onTextAreaChange}
      />

    </BaseTweetPage>
  )
}

export default TweetCreatePage;