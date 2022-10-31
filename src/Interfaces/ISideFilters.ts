export interface ISideFilterItem {
    id: string | number,
    name: string,
    path?: string | { pathname: string, search: string },
    isSelected?: boolean
}

export interface ISideFilterButton {
    label: string,
    onClick: (e: React.MouseEvent<HTMLElement>) => void,
}

export type ISideFilter = {
    id: string | number,
    name: string,
} & ({
    path?: string | { pathname: string, search: string },
    items?: never,
    button?: never,
} |
{
    items?: ISideFilterItem[],
    button?: ISideFilterButton,
    path?: never,
}) 