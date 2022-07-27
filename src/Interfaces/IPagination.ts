export interface IPagination {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
}

export interface IPaginationHook {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    lastPage: number;
    getPage: (page: number) => void;
    getItemsPerPage: (itemsPerPage: number) => void;
}

export interface ISetPagination {
    (pagination: IPagination): void;
}
