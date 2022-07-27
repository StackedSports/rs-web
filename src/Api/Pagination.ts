import { useState, useRef } from 'react'
import { IPaginationHook, ISetPagination } from 'Interfaces'

export const getPagination = (res: any) => {
    //console.log(res.headers)

    return {
        currentPage: parseInt(res.headers['current-page'] || '1'),
        totalPages: parseInt(res.headers['total-pages'] || '0'),
        itemsPerPage: parseInt(res.headers['page-items'] || '0'),
        totalItems: parseInt(res.headers['total-count'] || '0')
    }
}

export const paginationConfig = (currentPage: number, itemsPerPage: number) => ({ currentPage, itemsPerPage })

export const usePagination = (initialPage?: number, itemsPerPag?: number): [IPaginationHook, ISetPagination] => {

    const [currentPage, setCurrentPage] = useState(initialPage || 1)
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPag || 50)
    const [totalItems, setTotalItems] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const lastPage = useRef(currentPage)

    const setPagination: ISetPagination = (pagination) => {
        setCurrentPage(pagination.currentPage || 1)
        setItemsPerPage(pagination.itemsPerPage || 50)
        setTotalItems(pagination.totalItems)
        setTotalPages(pagination.totalPages)
    }

    const getPage = (page: number): void => {
        setCurrentPage(page || 1)
    }

    const getItemsPerPage = (itemsPerPage: number): void => {
        setItemsPerPage(itemsPerPage || 50)
    }

    const utils: IPaginationHook = {
        currentPage,
        totalPages,
        itemsPerPage,
        totalItems,
        lastPage: lastPage.current,
        getPage,
        getItemsPerPage,
    }

    return [utils, setPagination]
}