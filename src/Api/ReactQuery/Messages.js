import { useEffect, useState } from "react"
import { usePagination } from "Api/Pagination"
import { useQuery } from "react-query"
import { getMessages } from "Api/Endpoints"

export const useMessages = (currentPage, itemsPerPage, initialFilters) => {
    const [filters, setFilters] = useState(initialFilters)
    const [messages, setMessages] = useState([])
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)

    const reactQuery = useQuery([`messages/${pagination.currentPage}/${pagination.itemsPerPage}`, filters], () => getMessages(pagination.currentPage, pagination.itemsPerPage, filters), {
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiMessages, apiPagination] = reactQuery.data
            setPagination(apiPagination)
            setMessages(apiMessages)
        }
    }, [reactQuery.isSuccess, reactQuery.data])

    const filter = (filters) => {
        pagination.getPage(1)
        setFilters(filters)
    }

    const clearFilter = () => {
        setFilters(null)
        pagination.getPage(1)
    }

    return {
        ...reactQuery,
        items: messages,
        pagination,
        loading: reactQuery.isLoading,
        filter,
        clearFilter,
    }
}