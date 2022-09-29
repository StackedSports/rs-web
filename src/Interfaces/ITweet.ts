import { IUrls } from "./Shared";

interface IMediaTweet {
    id: number;
    name: string;
    file_name: string;
    file_type: string;
    size?: number;
    created_at: Date;
    urls: IUrls;
    hashid: string;
}

export interface ITweetApi {
    id: string;
    queued_by: string;
    posted_as: string;
    body: string;
    send_at: Date;
    created_at: Date;
    updated_at: Date;
    status: string;
    media: IMediaTweet[];
    url: string;
}

export interface ITweet {
    id: string;
    queued_by: string;
    posted_as: string;
    body: string;
    send_at: Date;
    created_at: Date;
    updated_at: Date;
    status: string;
    media: IMediaTweet[];
    url: string;
    twitter: string;
}


