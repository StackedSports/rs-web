import { useState, useRef, useEffect } from 'react'

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

/**
 * 
 * @param {*} config = { number: currentPage, number: itemsPerPage } 
 * @returns 
 */
//  export const usePagination = (initialConfig) => {
//     const config = useRef({
//         currentPage: initialConfig ? initialConfig.currentPage : 1,
//         itemsPerPage: initialConfig ? initialConfig.itemsPerPage : 50,
//         totalItems: 0,
//         totalPages: 0,
//     })
//     const [pagination, setPagination] = useState(config.current)
//     const [shouldUpdate, setShouldUpdate] = useState(false)

//     useEffect(() => {
//         if(config.current.currentPage != initialConfig?.currentPage
//           || config.current.itemsPerPage != initialConfig?.itemsPerPage) {
//             config.current = initialConfig
//             setPagination(initialConfig)
//             setShouldUpdate(!shouldUpdate)
//         }
//     }, [initialConfig])

//     const getPage = (page) => {
//         setPagination({
//             ...pagination,
//             currentPage: page
//         })
//     }

//     const setTotalItems = (total) => {
//         setPagination({
//             ...pagination,
//             totalItems: total
//         })
//     }

//     const setTotalPages = (total) => {
//         setPagination({
//             ...pagination,
//             totalPages: total
//         })
//     }

//     const updateResult = (totalItems, totalPages) => {
//         setPagination({
//             ...pagination,
//             totalPages,
//             totalItems
//         })
//     }

//     return {...pagination, shouldUpdate, getPage, setTotalItems, setTotalPages, updateResult}
// }