import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import { Divider, Stack } from '@mui/material';

import { tweetRoutes } from 'Routes/Routes';

import TweetPage from "./TweetPage";


const TweetCreatePage = (props) => {

  const onTopActionClick = () => {

  }

  const onSaveAndCloseAction = () => {

  }

  const onPreviewAndPostAction = () => {

  }

  const filters = [
    { // Category
      id: '0',
      name: 'Drafts',
      items: [
        // Filters
        { id: '0', name: 'Ben Graves', path: tweetRoutes.search },
      ]
    },
    { // Category
      id: '1',
      name: 'Posts',
      items: [
        // Filters
        { id: 'scheduled', name: 'Scheduled', path: tweetRoutes.tweets },
        { id: 'published', name: 'Published', path: tweetRoutes.tweets },
        { id: 'expired', name: 'Expired', path: tweetRoutes.tweets },
        { id: 'archived', name: 'Archived', path: tweetRoutes.tweets },
      ]
    },
  ]

  const actions = [
    {
      name: 'More',
      icon: ArrowDropDownIcon,
      variant: 'outlined',
      type: 'dropdown',
      // disabled: ,
      options: [
        // { name: '', onClick:  },
      ]
    },
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

  return (
    <TweetPage
      title="Create Post"
      topActionName="+ New Post"
      onTopActionClick={onTopActionClick}
      filters={filters}
      actions={actions}
    >
      <Divider />

    </TweetPage>
  )
}

export default TweetCreatePage;