import { IPagination } from "./IPagination";

type ForbidProps<T> = {
    [P in keyof T]?: never;
}

export interface ObjectWithId {
    id: string | number;
    [key: string]: any;
}

export interface ObjectWithArray {
    [key: string]: ObjectWithId[];
}

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

export interface IApiResponse extends Array<any | IPagination> {
    data: any;
    pagination: IPagination;
}

export interface IPanelFilters {
    [key: string]: {
        label: string;
        optionsLabel?: string | ((option: IPanelFilterOption) => string);
        optionsValue: (option: IPanelFilterOption) => any;
        type?: 'date' | 'hidden'; // default is dropdown
        disableFuture?: boolean; // for type date
        format?: string; // for type date
        options?: IPanelFilterOption[];
        isUnique?: boolean;
        onSearch?: (search: string) => void;
        loading?: boolean;
    }
}

export interface IPanelFilterOption {
    id: number | string;
    [key: string]: any;
}
export interface IPanelSelectedFilterOption {
    itemLabel: string;
    value: any;
    disabled?: boolean;
    [key: string]: unknown;
}