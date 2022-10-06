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
import { isFileValid } from 'utils/FileUtils';
import { IMediaTweet, ITweet } from 'Interfaces';

export type IPublishTweetMessage = {
  send_at: string | Date;
  post_as: string[];
  status: 'draft' | 'pending';
} & (
    { body: string; } |
    { media: string[]; }
  )

export const TweetCreatePage: React.FC<{ edit?: ITweet }> = (props) => {
  const app = useContext(AppContext)
  const user = useUser()
  const snippets = useSnippets()
  const teamMembers = useTeamMembers()
  const { createAsync: uploadMedia } = useMediaMutation()
  const { create: createTweet, update: updateTweet } = useTweetMutation()

  const [sendAt, setSendAt] = useState<string | Date>('ASAP')
  const [postAsSelected, setPostAsSelected] = useState<IMember[]>([])
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [uploadingMedia, setUploadingMedia] = useState(false)
  const [mediasSelected, setMediasSelected] = useState<null | { item: any[], type: "media" }>()
  const [showMediaDialog, setShowMediaDialog] = useState(false)
  const [postText, setPostText] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.edit) {
      console.log("edit from path", props.edit)
      props.edit.send_at && setSendAt(props.edit.send_at)
      props.edit.media.length > 0 && setMediasSelected({ item: props.edit.media, type: 'media' })
      props.edit.body && setPostText(props.edit.body)
      // setPostAsSelected(edit.posted_as) Different types
    }
  }, [props.edit])

  const onCreatePost = (control: 'save' | 'preview') => {
    console.log(control)

    const postData: Partial<IPublishTweetMessage> = {}

    postData.status = 'draft'

    if (postAsSelected.length === 0)
      return app.alert.setError("Please select at least one posting account")
    else
      postData.post_as = postAsSelected.map(member => member.id)

    postData['send_at'] = sendAt === 'ASAP' ? new Date() : sendAt

    if (postText.trim().length <= 0 && (!mediasSelected || mediasSelected?.item.length <= 0))
      return app.alert.setError("Please write something for your post or select a media")

    if (postText.trim().length > 0)
      postData.body = postText

    if (mediasSelected && mediasSelected?.item.length > 0) {
      postData.media = mediasSelected.item.map(media => media.id)
    }

    // return console.log(postData)

    if (props.edit && props.edit.id) {
      updateTweet({ id: props.edit.id, data: postData }, {
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
    } else {
      createTweet(postData, {
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
      onClick: () => onCreatePost('save'),
    },
    {
      name: 'Preview and Post',
      icon: SendIcon,
      variant: 'contained',
      onClick: () => onCreatePost("preview"),
    }
  ]

  const onTextAreaChange = (value: string) => {
    setPostText(value)
  }

  const onPostToSelected = (selected: IMember) => {
    setPostAsSelected(prev => [...new Set([...prev, selected])])
  }

  const onDateTimeSave = (date: string) => {
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

  const handleImportFiles = (files: FileList) => {
    setUploadingMedia(true)

    const filteredFiles = Array.from(files).filter(file => isFileValid(file))

    if (filteredFiles.length === 0) {
      setUploadingMedia(false)
      app.alert.setWarning("File not added because it does not match the file upload criteria")
      return
    }
    if (files.length != filteredFiles.length) {
      app.alert.setWaning("One or more files were not added since they do not match the file upload criteria")
    }

    onUploadMedia(filteredFiles)
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault();

    if (e.dataTransfer && e.dataTransfer.files.length > 4) {
      app.alert.setWarning("It is limited to the max of 4 media")
    } else if (e.dataTransfer) {
      handleImportFiles(e.dataTransfer.files)
    } else {
      app.alert.setError("Erro, no media found.")
    }
  }

  const onMediaSelected = (items: IMediaTweet[], type: "media") => {
    setMediasSelected({
      item: items,
      type
    })
    setShowMediaDialog(false)
  }

  const onUploadMedia = (files: File[]) => {
    const medias = files.map(file => ({
      file: file,
    }))

    Promise.allSettled(medias.map(media => uploadMedia(media))).
      then(result => {
        let failed = 0
        result.forEach(res => {
          if (res.status === "fulfilled") {
            setMediasSelected(prev => ({ type: 'media', item: [...(prev?.item || []), res.value] }))
          } else {
            failed++
          }
        })
        if (failed > 0)
          app.alert.setWarning("One or more media faild to upload")
      }).
      finally(() => setUploadingMedia(false))

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
        canAddMore={true}
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
        label='Post Message:'
        placeholder='Type something here...'
        snippets={snippets.items}
        hideTextPlaceholders
        value={postText}
        onChange={onTextAreaChange}
      />

    </BaseTweetPage>
  )
}

export default TweetCreatePage;
