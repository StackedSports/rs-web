import { ITwitterProfile, ITag } from '.'

export interface IRank {
    id: number;
    team_id: number;
    rank: string;
    created_at: Date;
    updated_at: Date;
}

export interface IStatus {
    id: number;
    team_id: number;
    status: string;
    created_at: Date;
    updated_at: Date;
}

export interface IRelationshipType {
    id: number;
    description: string;
}

export interface IRelationship {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    lives_with: boolean;
    active_in_life: boolean;
    top_influencer: boolean;
    twitter_profile_id?: any;
    person_relationship_type_id: number;
    team_contact_id: number;
    created_at: Date;
    updated_at: Date;
    profession?: any;
    relationship_type: IRelationshipType;
}

export interface IPositionCoach {
    full_name: string;
    id: string;
}

export interface IAreaCoach {
    full_name: string;
    id: string;
}

export interface ICoordinator {
    full_name: string;
    id: string;
}

export interface IOpponent {
    id: string;
    week: number;
    name: string;
    win_loss: boolean;
    score: string;
    team_contact_id: number;
    created_at: Date;
    updated_at: Date;
    notes: string;
}

export interface IContact {
    id: string;
    first_name: string;
    last_name: string;
    nick_name: string;
    email?: any;
    phone: string;
    dob: string;
    time_zone?: any;
    grad_year: number;
    high_school: string;
    state: string;
    rank: IRank;
    status: IStatus;
    status_2: string;
    archived: boolean;
    hudl: string;
    arms_id?: any;
    twitter_profile: ITwitterProfile;
    instagram_handle?: any;
    relationships: IRelationship[];
    position_coach: IPositionCoach;
    area_coach: IAreaCoach;
    coordinator: ICoordinator;
    advisor?: any;
    positions: string[];
    opponents: IOpponent[];
    tags: ITag[];
    associated_media?: any;
    sent_media?: any;
    preferred_comm_method?: any;
    url: string;
}