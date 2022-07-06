import { useState, useRef, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

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

export const usePagination = (initialPage, itemsPerPag) => {

    const [currentPage, setCurrentPage] = useState(Number(initialPage) || 1)
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPag || 50)
    const [totalItems, setTotalItems] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const lastPage = useRef(currentPage)

    const setPagination = (pagination) => {
        setCurrentPage(pagination.currentPage)
        setItemsPerPage(pagination.itemsPerPage)
        setTotalItems(pagination.totalItems)
        setTotalPages(pagination.totalPages)
    }

    const getPage = (page) => {
        setCurrentPage(Number(page) || 1)
    }

    const changeItemsPerPage = (itemsPerPage) => {
        setItemsPerPage(Number(itemsPerPage) || 50)
    }

    return [
        { currentPage, itemsPerPage, totalItems, totalPages, lastPage: lastPage.current, getPage,changeItemsPerPage }, // pagination
        setPagination//{ setPagination, getPage } // utils
    ]
}