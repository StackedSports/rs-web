import {ITwitterProfile,ITeam,ISettings} from '.'


    export interface ITeamMember {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        sms_number?: any;
        status: string;
        last_login_at?: any;
        role: string;
        twitter_profile: ITwitterProfile;
        team: ITeam;
        settings: ISettings;
        url: string;
    }
