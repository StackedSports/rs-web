import { IUrls } from "./Shared"


export type InboxType = 'sms' | 'dm'

export interface ITeamInboxItem {
    team_member_id: string,
    name: string,
    channel: number | string,
    type: InboxType
}

export interface ITeamInboxAPI {
    id: string,
    full_name: string,
    phone_number: number,
    twitter_enable: boolean
}

export interface IUserInboxItem {
    contact_id: string,
    name: string,
    profile_img: string,
    type: InboxType,
    from: string,
    preview: string | null,
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
    last_message_preview: string | null,
    last_received_time: string,
    message_type: string
}

export interface IUserInboxAPI {
    last_message: IUserInboxMessageAPI,
    team_contact: IUserInboxContactAPI
}
export interface IMediaChat {
    id?: number | string;
    name: string;
    file_type: string;
    urls: IUrls;
    hashid: string;
}

export interface IConversatitionAPI {
    message: string;
    direction: 'out' | 'in';
    from: string;
    to?: any;
    created_at: Date;
    media: IMediaChat | IMediaChat[];
    team_contact_id: number;
}
export interface IConversatition {
    id: string;
    text?: string | null;
    direction: 'out' | 'in';
    from: string;
    to?: any;
    created_at: Date;
    media?: IMediaChat | IMediaChat[] | null;
    team_contact_id: number;
}

export type ISendConversation = {
    user_id?: string;
    team_contact_id: string;
    type: InboxType;
} & (
        {
            message: string;
            media?: string;
        } |
        {
            message?: string;
            media: string;
        }
    )