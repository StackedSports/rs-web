

export interface ITeamInboxItem {
    id: number,
    name: string,
    channel?: number | string,
    type: 'sms' | 'dm'
}

export interface ITeamInboxAPI {
    id: number,
    full_name: string,
    phone_number: number,
    twitter_enable: boolean
}

export interface IUserInboxItem {
    id: string,
    name: string,
    profile_img: string,
    type: 'sms' | 'dm',
    from: string,
    preview: string,
    time: string
}

interface IUserInboxContactAPI {
    first_name: string,
    last_name: string,
    profile_image: string,
    team_contact_id: string
}

interface IUserInboxMessageAPI {
    from: string,
    last_message_preview: string,
    last_received_time: string,
    message_type: string
}

export interface IUserInboxAPI {
    last_message: IUserInboxMessageAPI,
    team_contact: IUserInboxContactAPI
}