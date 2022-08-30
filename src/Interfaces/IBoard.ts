
interface IStatus {
    id: string;
    status: string;
}

interface IRank {
    id: string;
    rank: string;
}

interface IAreaCoach {
    id: string;
    full_name: string;
}

interface IPositionCoach {
    id: string;
    full_name: string;
}

interface Criteria {
    status?: IStatus[];
    ranks?: IRank[];
    years?: number[];
    tags?: string[];
    positions?: string[];
    area_coaches?: IAreaCoach[];
    position_coaches?: IPositionCoach[];
    states?: string[];
    timezones?: string[];
    status_2?: string[];
}

interface Contacts {
    count: number;
}

interface Settings {
    selected_columns: string[];
}

export interface IBoard {
    id: string;
    name: string;
    is_shared: boolean;
    criteria: Criteria;
    contacts: Contacts;
    url: string;
    settings?: Settings;
}

