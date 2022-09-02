import { IFilterOption, ISettings, ITeam, ITwitterProfile } from "./Shared";

export interface ITagApi {
    id: string;
    name: string;
}

export interface IStatusApi {
    id: string;
    status: string;
}

export interface IRankApi {
    id: string;
    rank: string;
}

export interface IPositionsApi {
    id: string;
    name: string;
    abbreviation: string;
    standardized_name: string;
    role: string;
    alternate_names: string;
}

export interface IMemberApi {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    sms_number?: number;
    status: string;
    last_login_at?: Date;
    role: string;
    twitter_profile: ITwitterProfile;
    team: ITeam;
    settings: ISettings;
    url: string;
}

// transformations response from the server
export interface ITag extends ITagApi, IFilterOption<string> { }
export interface IStatus extends IStatusApi, IFilterOption<string> { }
export interface IPositions extends IPositionsApi, IFilterOption<string> { }
export interface IMember extends IMemberApi, IFilterOption<string> { }
