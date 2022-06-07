import { useEffect, useState } from "react"
import { usePagination } from "Api/Pagination"
import { useQuery } from "react-query"
import { filterMedias, getMedias, getMedia, getMediaTypes } from "Api/Endpoints"
import lodash from "lodash"

export const useMedia = (id) => {
    const reactQuery = useQuery(`media/${id}`, () => getMedia(id), {
        select: (data) => data[0],
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

    //get right function if filter is null or empty get filterMidias else get getMidas
    const get = filters && !lodash.isEmpty(filters) ? filterMedias : getMedias

    const reactQuery = useQuery([`medias/${pagination.currentPage}/${pagination.itemsPerPage}`, filters], () => get(pagination.currentPage, pagination.itemsPerPage, filters), {
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiMedias, apiPagination] = reactQuery.data
            setPagination(apiPagination)
            setMedias(apiMedias)
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
    }, [reactQuery.isSuccess, reactQuery.data])

    return {
        ...reactQuery,
        items: mediaTypes,
        loading: reactQuery.isLoading,
    }
}