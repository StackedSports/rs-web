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
        options: IPanelFilterOption[];
        optionsLabel?: string | ((option: IPanelFilterOption) => string);
        optionsValue: (option: IPanelFilterOption) => any;
        selected?: IPanelSelectedFilterOption[];
        isUnique?: boolean;
        type?: 'date' | 'hidden';
        //for type date
        dateFormat?: string;
        disableFuture?: boolean;
        // for default type dropdown
        onSearch?: (value: string) => void;
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