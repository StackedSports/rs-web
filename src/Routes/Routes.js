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
    userSettings: {
        title: ' User Settings',
        path: '/user', //
        // icon: SettingsIcon
    },
}

export const messageRoutes = {
    create: '/messages/create',
    edit: '/messages/edit',
    details: '/messages/details',
    all: '/messages',
    filters: {
        main: '/messages/filter',
        drafts: '/messages/filter/status/drafts',
        scheduled: '/messages/filter/status/scheduled',
        inProgress: '/messages/filter/status/in_progress',
        finished: '/messages/filter/status/finished',
        error: '/messages/filter/status/error',
        rejected: '/messages/filter/status/rejected',
        archived: '/messages/filter/status/archived',
        teamMembers: '/messages/filter/team_members',
    }
}

export const mediaRoutes = {
    all: '/media',
    media: '/media/media',
    placeholders: '/media/placeholders',
    mediaDetails: '/media/media/details',
    placeholderDetails: '/media/placeholders/details',
    filters: {
        base: '/media/media/filters/:type/:value',
        recent: '/media/media/filters/type/recent',
        images: '/media/media/filters/type/image',
        videos: '/media/media/filters/type/video',
        gifs: '/media/media/filters/type/gif',
        personalized: '/media/media/filters/type/personalized',
        placeholders: '/media/placeholders',
        owner: '/media/media/filters/owner'
    }
}

export const settingsRoutes = {
    main: '/settings',
    general: {
        main: '/settings/general',
        organization: '/settings/organization',
        members: '/settings/team-members',
        member: '/settings/team-members',
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

export const contactsRoutes = {
    all: '/contacts',
    board: '/contacts/board',
    profile: '/contacts/profile'
}

export const userRoutes = {
    profile: "/user/profile",
    account: "/user/account",
    notifications: "/user/notifications",
}