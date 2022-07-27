import { ITwitterProfile, ITeam, ISettings } from '.'

export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    sms_number?: string;
    status: string;
    last_login_at: Date;
    role: string;
    twitter_profile: ITwitterProfile;
    team: ITeam;
    settings: ISettings;
    url: string;
    token: string;
}
