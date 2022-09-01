export interface IPaginationApi {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
}

export interface IFilterOption<T> {
    itemLabel: string;
    value: T;
}