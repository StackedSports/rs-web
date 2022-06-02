import { useEffect, useState } from "react"
import { usePagination } from "Api/Pagination"
import { useQuery } from "react-query"
import { getPlaceholders } from "Api/Endpoints"

export const usePlaceholders = (currentPage, itemsPerPage, initialFilters) => {
    const [placeholders, setPlaceholders] = useState([])
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)
    const [filters, setFilters] = useState(initialFilters)

    const reactQuery = useQuery([`placeholders/${pagination.currentPage}/${pagination.itemsPerPage}`, filters], () => getPlaceholders(pagination.currentPage, pagination.itemsPerPage, filters), {
        refetchOnWindowFocus: false,
        staleTime: 60000,
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiPlaceholders, apiPagination] = reactQuery.data
            setPagination(apiPagination)
            setPlaceholders(apiPlaceholders)
        }
    }, [reactQuery.isSuccess])

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
        items: placeholders,
        pagination,
        loading: reactQuery.isLoading,
        filter,
        clearFilter,
    }
}