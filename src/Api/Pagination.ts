import { IPaginationApi } from 'Interfaces';
import { useState, useRef, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

interface IPagination {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    totalItems: number;
    getPage: (page: number) => void;
    getItemsPerPage: (itemsPerPage: number) => void;
}

export const getPagination = (res: any) => {
    //console.log(res.headers)

    return {
        currentPage: parseInt(res.headers['current-page'] || '1'),
        totalPages: parseInt(res.headers['total-pages'] || '0'),
        itemsPerPage: parseInt(res.headers['page-items'] || '0'),
        totalItems: parseInt(res.headers['total-count'] || '0')
    }
}

export const usePagination = (initialPage: number, itemsPerPag: number): [IPagination, (pagination: IPaginationApi) => void] => {

    const [currentPage, setCurrentPage] = useState(Number(initialPage) || 1)
    const [itemsPerPage, setItemsPerPage] = useState(Number(itemsPerPag) || 50)
    const [totalItems, setTotalItems] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const setPagination = (pagination: IPaginationApi) => {
        setCurrentPage(pagination.currentPage || 1)
        setItemsPerPage(pagination.itemsPerPage || 50)
        setTotalItems(pagination.totalItems)
        setTotalPages(pagination.totalPages)
    }

    const getPage = (page: number) => {
        setCurrentPage(Number(page) || 1)
    }

    const getItemsPerPage = (itemsPerPage: number) => {
        setItemsPerPage(Number(itemsPerPage) || 50)
        setCurrentPage(1)
    }

    return [
        { currentPage, itemsPerPage, totalItems, totalPages, getPage, getItemsPerPage }, // pagination
        setPagination//{ setPagination, getPage } // utils
    ]
}