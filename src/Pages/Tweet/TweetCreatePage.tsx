import React, { useContext, useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import { Divider } from '@mui/material';

import { AppContext } from 'Context/AppProvider';

import MessageInput from 'UI/Forms/Inputs/MessageInput';
import DateTimePicker from 'UI/Widgets/DateTimePicker';
import MediaSelectDialog from 'UI/Widgets/Media/MediaSelectDialog';
import { formatDate } from 'utils/Parser';
import { useUser } from 'Api/Hooks';
import { useMediaMutation, useSnippets, useTeamMembers, useTweetMutation } from 'Api/ReactQuery';
import { BaseTweetPage } from './BaseTweetPage';
import { IMember } from 'Interfaces/ISettings';
import { tweetRoutes } from 'Routes/Routes';

export type IPublishTweetMessage = {
  send_at: string | Date;
  post_as: string[];
  status: 'draft' | 'pending';
} & (
    { body: string; } |
    { media: string[]; }
  )

interface ITweetCreatePageProps {
  edit?: boolean
}

export const TweetCreatePage: React.FC<ITweetCreatePageProps> = (props) => {
  const app = useContext(AppContext)
  const user = useUser()
  const snippets = useSnippets()
  const teamMembers = useTeamMembers()
  const { create: uploadMedia } = useMediaMutation()
  const { create: createTweet } = useTweetMutation()

  const [sendAt, setSendAt] = useState('ASAP')
  const [postAsSelected, setPostAsSelected] = useState<IMember[]>([])
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [uploadingMedia, setUploadingMedia] = useState(false)
  const [mediasSelected, setMediasSelected] = useState<null | { item: any[], type: "media" }>()
  const [showMediaDialog, setShowMediaDialog] = useState(false)
  const [textMessage, setTextMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onCreateMessage = (control: 'save' | 'preview') => {
    console.log(control)

    const messageData: Partial<IPublishTweetMessage> = {}

    messageData.status = 'draft'

    if (postAsSelected.length === 0)
      return app.alert.setError("Please select at least one person to publish a tweet")
    else
      messageData.post_as = postAsSelected.map(member => member.id)

    messageData['send_at'] = sendAt === 'ASAP' ? new Date() : sendAt

    if (textMessage.trim().length <= 0 && (!mediasSelected || mediasSelected?.item.length <= 0))
      return app.alert.setError("Please enter a message or select a media")

    if (textMessage.trim().length > 0)
      messageData.body = textMessage

    if (mediasSelected && mediasSelected?.item.length > 0) {
      messageData.media = mediasSelected.item.map(media => media.id)
    }



    if (props.edit) {
      console.log("edit")
    } else {
      createTweet(messageData, {
        onSuccess: (result) => {
          let message = result.data
          console.log(message)
          switch (control) {
            case 'save':
              console.log('save')
              app.redirect(`${tweetRoutes.all}`)
              break
            case 'preview':
              app.redirect(`${tweetRoutes.details}/${message.id}`)
              break
            default:
              throw new Error("Error control create message")
          }
        },
        onError: (error) => {
          console.log(error)
        },
      })
    }

  }

  const actions = [
    {
      name: 'Save and Close',
      icon: CheckIcon,
      variant: 'outlined',
      onClick: () => onCreateMessage('save'),
    },
    {
      name: 'Preview and Post',
      icon: SendIcon,
      variant: 'contained',
      onClick: () => onCreateMessage("preview"),
    }
  ]

  const onTextAreaChange = (value: string) => {
    setTextMessage(value)
  }

  const onPostToSelected = (selected: IMember) => {
    setPostAsSelected(prev => [...new Set([...prev, selected])])
  }

  const onDateTimeSave = (date: string) => {
    // date = 'ASAP' or UTC Date
    setSendAt(date)
    setShowTimePicker(false)
  }

  const onPostToRemove = (selectedIndex: number) => {
    setPostAsSelected(prev => prev.filter((_, index) => index !== selectedIndex))
  }

  const onRemoveMedia = (index: number) => {
    setMediasSelected(prev => {
      if (prev) {
        const items = prev.item.filter((_, i) => i !== index)
        if (items.length === 0)
          return null
        else
          return ({
            ...prev,
            item: prev?.item.filter((_, i) => i !== index)
          })
      } else
        return null
    })
  }

  const handleImportFiles = (file: File) => {
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

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    return

    /*  if (e.dataTransfer && e.dataTransfer.files.length > 1) {
       app.alert.setWarning("It is not possible to select more than one media.")
     } else if (e.dataTransfer) {
       handleImportFiles(e.dataTransfer.files[0])
     } else {
       app.alert.setError("Erro, no media found.")
     } */
  }

  const onMediaSelected = (item, type) => {
    setMediasSelected({
      item,
      type
    })
    setShowMediaDialog(false)
  }

  const onUploadMedia = (file: File) => {
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

  const onMediaSelectedClick = () => {
    setShowMediaDialog(true)
  }

  return (
    <BaseTweetPage
      title="Create Post"
      topActionName="+ New Post"
      actions={actions}
    >
      <Divider />

      <MediaSelectDialog
        onlyMedias
        open={showMediaDialog}
        onSelected={onMediaSelected}
        selectedItem={mediasSelected}
        onClose={() => setShowMediaDialog(false)}
        limit={4}
      />

      <DateTimePicker
        open={showTimePicker}
        onSave={onDateTimeSave}
        onClose={() => setShowTimePicker(false)}
      />

      <MessageInput
        type='sender'
        label='Post as:'
        name='Posting Account'
        contacts={teamMembers.items}
        selected={postAsSelected}
        onSelected={onPostToSelected}
        onRemove={onPostToRemove}
        canAddMore={postAsSelected.length < 5}
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
        selected={mediasSelected}
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
        hideTextPlaceholders
        value={textMessage}
        onChange={onTextAreaChange}
      />

    </BaseTweetPage>
  )
}

export default TweetCreatePage;
