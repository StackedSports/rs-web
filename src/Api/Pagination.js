import { useState, useRef, useEffect } from 'react'

export const getPagination = (res) => {
    //console.log(res.headers)

    return {
        currentPage: parseInt(res.headers['current-page'] || '1'),
        totalPages: parseInt(res.headers['total-pages'] || '0'),
        itemsPerPage: parseInt(res.headers['page-items'] || '0'),
        totalItems: parseInt(res.headers['total-count'] || '0')
    }
}

export const paginationConfig = (currentPage, itemsPerPage) => ({ currentPage, itemsPerPage })

export const usePagination = (currentPag, itemsPerPag) => {
    const [currentPage, setCurrentPage] = useState(currentPag || 1)
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPag || 50)
    const [totalItems, setTotalItems] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const lastPage = useRef(currentPage || 1)

    const setPagination = (pagination) => {
        setCurrentPage(pagination.currentPage)
        setItemsPerPage(pagination.itemsPerPage)
        setTotalItems(pagination.totalItems)
        setTotalPages(pagination.totalPages)
    }

    const getPage = (page) => {
        setCurrentPage(page)
    }

    return [
        { currentPage, itemsPerPage, totalItems, totalPages, lastPage: lastPage.current, getPage }, // pagination
        setPagination//{ setPagination, getPage } // utils
    ]
}