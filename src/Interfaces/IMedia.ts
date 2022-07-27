import { ITwitterProfile } from "./ICommons";


export interface IOwner {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    twitter_profile: ITwitterProfile;
}

export interface IActivity {
    dms: number;
    sms: number;
    pts: number;
    tweets: number;
}

export interface IUrls {
    thumb: string;
    medium: string;
    large: string;
    original: string;
}

export interface IMedia {
    id: number;
    hashid: string;
    name: string;
    file_name?: any;
    size: number;
    duration: number;
    tags: any[];
    created_at: Date;
    updated_at: Date;
    discarded_at?: any;
    owner: IOwner;
    group: string;
    media_placeholder_id?: any;
    contact?: any;
    activity: IActivity;
    url: string;
    urls: IUrls;
    file_type: string;
}

export interface IPlaceholder {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    media_count: number;
    media: IMedia[];
}

export interface IMediaType {
    type: string;
    key: number;
    name: string;
    id: number;
}