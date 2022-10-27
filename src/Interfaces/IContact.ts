import { ITwitterProfile } from "./Shared";

interface Rank {
    id: string;
    team_id: number;
    rank: string;
    created_at: Date;
    updated_at: Date;
}

interface Status {
    id: string;
    team_id: number;
    status: string;
    created_at: Date;
    updated_at: Date;
}

interface RelationshipType {
    id: number;
    description: string;
}

interface Relationship {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    lives_with?: boolean;
    active_in_life?: boolean;
    top_influencer?: boolean;
    twitter_profile_id?: any;
    person_relationship_type_id: number;
    team_contact_id: number;
    created_at: Date;
    updated_at: Date;
    profession?: any;
    relationship_type: RelationshipType;
}

interface PositionCoach {
    full_name: string;
    id: string;
}

interface AreaCoach {
    full_name: string;
    id: string;
}

interface Coordinator {
    full_name: string;
    id: string;
}

interface Opponent {
    id: string;
    week: number;
    name: string;
    win_loss?: boolean;
    score: string;
    team_contact_id: number;
    created_at: Date;
    updated_at: Date;
    notes: string;
    ets_code?: any;
}

interface Tag {
    id: number;
    name: string;
}

export interface IContact {
    id: string;
    first_name: string;
    last_name: string;
    nick_name: string;
    email: string;
    phone: string;
    dob: string;
    time_zone: string;
    grad_year?: number;
    high_school: string;
    state: string;
    rank: Rank;
    status: Status;
    status_2: string;
    ets_code: string;
    archived: boolean;
    hudl: string;
    arms_id?: number | null;
    twitter_profile: ITwitterProfile;
    instagram_handle?: string | null;
    relationships: Relationship[];
    position_coach: PositionCoach;
    area_coach: AreaCoach | null;
    coordinator: Coordinator;
    advisor?: any;
    positions: string[];
    opponents: Opponent[];
    tags: Tag[];
    associated_media?: any;
    sent_media?: any;
    preferred_comm_method?: any;
    url: string;
}