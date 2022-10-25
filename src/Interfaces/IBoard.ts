import { IFilterOption } from "./Shared";

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

export interface IBoardCriteriaApi {
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
    dob?: [string, string];
}
interface Contacts {
    count: number;
}

interface Settings {
    selected_columns: string[];
}

//Board api response
export interface IBoardApi {
    id: string;
    name: string;
    is_shared: boolean;
    criteria: IBoardCriteriaApi;
    contacts: Contacts;
    url: string;
    settings?: Settings;
}

// transformations response from the server
interface IStatusFilter extends IStatus, IFilterOption<string> { }
interface IRankFilter extends IRank, IFilterOption<string> { }
interface IAreaCoachesFilter extends IAreaCoach, IFilterOption<string> { }
interface IPositionCoachesFilter extends IPositionCoach, IFilterOption<string> { }
interface IYearFilter extends IFilterOption<string | number> { }
interface ITagsFilter extends IFilterOption<string> { }
interface IPositionsFilter extends IFilterOption<string> { }
interface IStatesFilter extends IFilterOption<string> { }
interface ITimezonesFilter extends IFilterOption<string> { }
interface IStatus_2Filter extends IFilterOption<string> { }
interface dobFilter extends IFilterOption<string> { }


export interface IBoardCriteria {
    status?: IStatusFilter[];
    rank?: IRankFilter[];
    grad_year?: IYearFilter[];
    tags?: ITagsFilter[];
    positions?: IPositionsFilter[];
    area_coach?: IAreaCoachesFilter[];
    position_coach?: IPositionCoachesFilter[];
    state?: IStatesFilter[];
    time_zone?: ITimezonesFilter[];
    status_2?: IStatus_2Filter[];
    dob?: dobFilter[];
}
export interface IBoard {
    id: string;
    name: string;
    is_shared: boolean;
    criteria: IBoardCriteria;
    contacts: Contacts;
    url: string;
    settings?: Settings;
}
