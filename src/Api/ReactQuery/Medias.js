import { useEffect, useState } from "react"
import { usePagination } from "Api/Pagination"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { filterMedias, getMedias, getMedia, getMediaTypes, updateMedia, deleteMedia, uploadMedia } from "Api/Endpoints"
import lodash from "lodash"

export const useMedia = (id) => {
    const reactQuery = useQuery(['media', id], () => getMedia(id), {
        select: (data) => data[0],
        enabled: !!id,
    })

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

export const useMedias = (initialPage, itemsPerPage, initialFilters) => {
    const [filters, setFilters] = useState(initialFilters)
    const [pagination, setPagination] = usePagination(initialPage, itemsPerPage)
    const [medias, setMedias] = useState([])

    //get right function if filter is null or empty get filterMidias else get getMidas
    const get = filters && !lodash.isEmpty(filters) ? filterMedias : getMedias

    const reactQuery = useQuery(['medias', pagination.currentPage, pagination.itemsPerPage, filters], () => get(pagination.currentPage, pagination.itemsPerPage, filters), {
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiMedias, apiPagination] = reactQuery.data
            setPagination(apiPagination)
            setMedias(apiMedias)
        }
        if (reactQuery.isError) {
            setMedias([])
        }
    }, [reactQuery.isSuccess, reactQuery.data, reactQuery.isError])

    useEffect(() => {
        if (!lodash.isEqual(initialFilters, filters)) {
            setFilters(initialFilters)
            pagination.getPage(1)
        }
    }, [initialFilters])

    useEffect(() => {
        if (initialPage && initialPage != pagination.currentPage) {
            pagination.getPage(initialPage)
        }
    }, [initialPage])

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
        if (reactQuery.isError) {
            setMediaTypes([])
        }
    }, [reactQuery.isSuccess, reactQuery.data])

    return {
        ...reactQuery,
        items: mediaTypes,
        loading: reactQuery.isLoading,
    }
}

export const useMediaMutation = () => {
    const queryClient = useQueryClient();

    const update = useMutation(({ id, data }) => updateMedia(id, data),
        {
            onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries(['media', variables.id], { active: true })
                queryClient.invalidateQueries('medias')
            },
        })

    const remove = useMutation((id) => deleteMedia(id),
        {
            onSuccess: () => {
                queryClient.cancelQueries('media', { active: true })
                queryClient.resetQueries('medias')
            }
        })

    const create = useMutation((media) => uploadMedia(media),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('medias')
            },
        })

    return {
        update: update.mutate,
        updateAsync: update.mutateAsync,
        remove: remove.mutate,
        create: create.mutate,
        createAsync: create.mutateAsync,
    }
}