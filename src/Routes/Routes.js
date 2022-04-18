import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

export const routes = {
    dashboard: {
        title: 'Dashboard',
        path: '/dashboard',
        icon: HomeOutlinedIcon
    },
    contacts: {
        title: 'Contacts',
        path: '/contacts',
        icon: PersonOutlineOutlinedIcon
    },
    messages: {
        title: 'Messages',
        path: '/messages', // /messages
        icon: AddCommentOutlinedIcon
    },
    media: {
        title: 'Media',
        path: '/media',
        icon: ImageOutlinedIcon
    },
    twitterPosts: {
        title: 'Tweets',
        path: '/tweet-create', // /twitter-posts
        icon: TwitterIcon
    },
    twitterStream: {
        title: 'Twitter Stream',
        path: '/twitter-stream',
        icon: PublicOutlinedIcon
    },
    settings: {
        title: 'Settings',
        path: '/settings', // /settings
        icon: SettingsIcon
    },
}

export const messageRoutes = {
    create: '/messages/create',
    edit: '/messages/edit',
    details: '/messages/details',
    all: '/messages',
    filters: {
        main: '/messages/filter',
        drafts: '/messages/filter/drafts',
        scheduled: '/messages/filter/pending',
        inProgress: '/messages/filter/in_progress',
        finished: '/messages/filter/finished',
        error: '/messages/filter/error',
        rejected: '/messages/filter/rejected',
        archived: '/messages/filter/archived',
    }
}

export const mediaRoutes = {
    all: '/media',
    media: '/media/media',
    placeholders: '/media/placeholders',
    mediaDetails: '/media/media/details',
    placeholderDetails: '/media/placeholders/details'
}

export const settingsRoutes = {
    main: '/settings',
    general: {
        main: '/settings/general',
        organization: '/settings/organization',
        members: '/settings/team-members',
    },
    team: {
        main: '/settings/team',
        positions: '/settings/positions',
        statuses: '/settings/statuses',
        ranks: '/settings/ranks',
        snippets: '/settings/snippets',
        platforms: '/settings/platforms',
        
        // tags: '/settings/tags',
        // gradYears: '/settings/grad-years',
        // placeholders: '/settings/placeholders',
        // getSendCoachTypes: '/settings/get_send_as_coaches',
        // peopleTypes: '/settings/people_types',
    },
    tags: {
        mediaTags: '/settings/media-tags',
        contactsTags: '/settings/contacts-tags',
        messageTags: '/settings/message-tags',
    },
}

export const contactRoutes = {
    board: '/contacts/board'
}