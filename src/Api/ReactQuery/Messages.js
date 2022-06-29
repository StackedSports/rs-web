import { useEffect, useState } from "react"
import { usePagination } from "Api/Pagination"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { createMessage, getMessage, getMessageRecipients, getMessages } from "Api/Endpoints"
import lodash from "lodash"

export const useMessages = (initialPage, itemsPerPage, initialFilters) => {
    const [filters, setFilters] = useState(initialFilters)
    const [messages, setMessages] = useState([])
    const [pagination, setPagination] = usePagination(initialPage, itemsPerPage)

    const reactQuery = useQuery(['messages', pagination.currentPage, pagination.itemsPerPage, filters], () => getMessages(pagination.currentPage, pagination.itemsPerPage, filters), {
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiMessages, apiPagination] = reactQuery.data
            setPagination(apiPagination)
            setMessages(apiMessages)
        }
        if (reactQuery.isError) {
            setMessages([])
        }
    }, [reactQuery.isSuccess, reactQuery.data, reactQuery.error])

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
        setFilters(filters)
        pagination.getPage(1)
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

export const useMessage = (id) => {
    const reactQuery = useQuery(['message', id], () => getMessage(id), {
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

export const useMessageMutations = () => {
    const queryClient = useQueryClient();

    const create = useMutation((message) => createMessage(message),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('messages')
            },
        })

    const update = useMutation((message) => updateMedia(message),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('messages')
            }
        })


    return {
        update: update.mutate,
        create: create.mutate,
    }
}

export const useMessageRecipients = (id, currentPage, itemsPerPage) => {
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)
    const [recipients, setRecipients] = useState()

    const reactQuery = useQuery([`message/${id}/recipients/${pagination.currentPage}/${pagination.itemsPerPage}`], () => getMessageRecipients(id, pagination.currentPage, pagination.itemsPerPage))

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiRecipients, apiPagination] = reactQuery.data
            setPagination(apiPagination)
            setRecipients(apiRecipients)
        }
    }, [reactQuery.isSuccess, reactQuery.data])

    return {
        ...reactQuery,
        items: recipients,
        pagination,
        loading: reactQuery.isLoading,
    }
}