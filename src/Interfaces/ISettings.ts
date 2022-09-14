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

export interface ISnippetsApi {
    id: string;
    content: string;
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

export interface IPlatformApi {
    id: number;
    name: string;
}

export interface ITextPlaceholderApi {
    contact_details: string[];
    relationships: string[];
    opponents: string[];
}

export interface IPeopleTypeApi {
    id: number;
    description: string;
    created_at: Date;
    updated_at: Date;
}

// transformations response from the server
export interface ITag extends ITagApi, IFilterOption<string> { }
export interface IStatus extends IStatusApi, IFilterOption<string> { }
export interface IStatus_2 extends IFilterOption<string> { }
export interface IPositions extends IPositionsApi, IFilterOption<string> { }
export interface IMember extends IMemberApi, IFilterOption<string> { }
export interface IRank extends IRankApi, IFilterOption<string> { }
export interface ISnippets extends ISnippetsApi, IFilterOption<string> { }
export interface IGradYears extends IFilterOption<string | number> { }
export interface IPlatform extends IPlatformApi, IFilterOption<string | number> { }
export interface IPeopleType extends IPeopleTypeApi, IFilterOption<string | number> { }
