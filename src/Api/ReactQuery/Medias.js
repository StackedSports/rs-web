import { useEffect, useState } from "react"
import { usePagination } from "Api/Pagination"
import { useQuery } from "react-query"
import { filterMedias, getMedia, getMediaTypes } from "Api/Endpoints"


export const useMedia = (id) => {
    const reactQuery = useQuery(`media/${id}`, () => getMedia(id), {
        select: (data) => data[0],
        staleTime: 60000,
    })

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

export const useMedias = (currentPage, itemsPerPage, initialFilters) => {
    const [filters, setFilters] = useState(initialFilters)
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)
    const [medias, setMedias] = useState([])

    const reactQuery = useQuery([`medias/${pagination.currentPage}/${pagination.itemsPerPage}`, filters], () => filterMedias(pagination.currentPage, pagination.itemsPerPage), {
        refetchOnWindowFocus: false,
        staleTime: 60000,
    })


    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiMedias, apiPagination] = reactQuery.data
            setPagination(apiPagination)
            setMedias(apiMedias)
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
        items: medias,
        pagination,
        loading: reactQuery.isLoading,
        filter,
        clearFilter,
    }
}

export const useMediaTypes = () => {
    const [mediaTypes, setMediaTypes] = useState([])

    const reactQuery = useQuery(`mediaTypes`, () => getMediaTypes())

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiMediaTypes] = reactQuery.data
            setMediaTypes(
                apiMediaTypes.map(item => ({
                    ...item,
                    id: item.key,
                    name: item.type,
                }))
            )
        }
    }, [reactQuery.isSuccess])

    return {
        ...reactQuery,
        items: mediaTypes,
        loading: reactQuery.isLoading,
    }
}