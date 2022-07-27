export interface ITwitterProfile {
    screen_name?: any;
    profile_image: string;
}

export interface ILogo {
    thumb: string;
    medium: string;
    large: string;
    original: string;
}


export interface IOrg {
    id: string;
    name: string;
    nickname: string;
    mascot?: any;
    logo: ILogo;
    primary_color: string;
    secondary_color: string;
}

export interface ITeam {
    id: number;
    name: string;
    role: string;
    org: IOrg;
}

export interface ISettings {
    selected_columns: string[];
}