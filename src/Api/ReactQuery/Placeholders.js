import { useEffect, useState } from "react"
import { usePagination } from "Api/Pagination"
import { useQuery } from "react-query"
import { getPlaceholder, getPlaceholderMedia, getPlaceholders } from "Api/Endpoints"

export const usePlaceholder = (id) => {
    const reactQuery = useQuery(`placeholder/${id}`, () => getPlaceholder(id), {
        select: (data) => data[0],
        enabled: !!id,
    })

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

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
        items: placeholders,
        pagination,
        loading: reactQuery.isLoading,
        filter,
        clearFilter,
    }
}

export const usePlaceholderMedia = (id, currentPage, itemsPerPage) => {
    const [medias, setMedias] = useState(null)
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)

    const reactQuery = useQuery(
        `placeholder/${id}/medias/${pagination.currentPage}/${pagination.itemsPerPage}`,
        () => getPlaceholderMedia(id, pagination.currentPage, pagination.itemsPerPage),
        { enabled: !!id, }
    )

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiMedias, apiPagination] = reactQuery.data
            setPagination(apiPagination)
            setMedias(apiMedias)
        }
    }, [reactQuery.isSuccess, reactQuery.data])

    return {
        ...reactQuery,
        items: medias,
        pagination,
        loading: reactQuery.isLoading,
    }
}