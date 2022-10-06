export interface ISideFilterItem {
    id: string,
    name: string,
    path: string | { pathname: string, search: string }
}

export interface ISideFilterButton {
    label: string,
    onClick: Function
}

export interface ISideFilter {
    id: string | number,
    name: string,
    path?: string | { pathname: string, search: string },
    items?: ISideFilterItem[],
    button?: ISideFilterButton
}