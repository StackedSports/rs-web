import { useEffect, useState } from "react"
import { usePagination } from "Api/Pagination"
import { useQuery, useQueryClient, useMutation } from "react-query"
import { getContacts, filterContacts, getContact, getContactAssociatedMedia, getContactSentMedia, getContactConversation, getContactStats, updateContact, createContact, getArchivedContacts, archiveContact } from "Api/Endpoints"
import lodash from "lodash"

export const useContact = (id: string) => {
    const reactQuery = useQuery(['contact', id], () => getContact(id), {
        select: (data) => data[0],
        enabled: !!id
    })

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

export const useContactAssociatedMedia = (id: string, page: number, perPage: number) => {
    const [pagination, setPagination] = usePagination(page, perPage)
    const [associatedMedia, setAssociatedMedia] = useState([])

    const reactQuery = useQuery(['contact', 'associatedMedia', id, pagination.currentPage, pagination.itemsPerPage],
        () => getContactAssociatedMedia(id, pagination.currentPage, pagination.itemsPerPage),
        { enabled: !!id }
    )

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiAssociatedMedia, apiPagination] = reactQuery.data
            setAssociatedMedia(apiAssociatedMedia.map(item => ({ ...item, urls: item.url })))
            setPagination(apiPagination)
        }
    }, [reactQuery.isSuccess, reactQuery.data])

    return {
        ...reactQuery,
        items: associatedMedia,
        pagination,
        loading: reactQuery.isLoading,
    }
}

export const useContactSentMedia = (id: string, page?: number, perPage?: number) => {
    const [pagination, setPagination] = usePagination(page, perPage)
    const [sentMedia, setSentMedia] = useState([])

    const reactQuery = useQuery(['contact', 'sentMedia', id, pagination.currentPage, pagination.itemsPerPage],
        () => getContactSentMedia(id, pagination.currentPage, pagination.itemsPerPage),
        { enabled: !!id }
    )

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiSentMedias, apiPagination] = reactQuery.data
            setSentMedia(apiSentMedias)
            setPagination(apiPagination)
        }
    }, [reactQuery.isSuccess, reactQuery.data])

    return {
        ...reactQuery,
        items: sentMedia,
        pagination,
        loading: reactQuery.isLoading,
    }
}

export const useContactConversation = (id: string, page: number, perPage: number) => {
    const [pagination, setPagination] = usePagination(page, perPage)
    const [conversation, setConversation] = useState([])

    const reactQuery = useQuery(['contact', 'conversation', id, pagination.currentPage, pagination.itemsPerPage],
        () => getContactConversation(id, pagination.currentPage, pagination.itemsPerPage),
        { enabled: !!id }
    )

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiConversation, apiPagination] = reactQuery.data
            setConversation(apiConversation)
            setPagination(apiPagination)
        }
    }, [reactQuery.isSuccess, reactQuery.data])

    return {
        ...reactQuery,
        items: conversation,
        pagination,
        loading: reactQuery.isLoading,
    }
}

export const useContactStats = (id: string) => {
    const reactQuery = useQuery(['contact', 'stats', id], () => getContactStats(id), {
        enabled: !!id,
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

export const useContacts = (page, itemsPerPage, initialFilters, only_archived: boolean = false) => {
    const [filters, setFilters] = useState(initialFilters)
    const [pagination, setPagination] = usePagination(page, itemsPerPage)
    const [contacts, setContacts] = useState()

    const get = only_archived ? getArchivedContacts : (filters && !lodash.isEmpty(filters)) ? filterContacts : getContacts

    const reactQuery = useQuery(['contacts', pagination.currentPage, pagination.itemsPerPage, filters, only_archived], () => get(pagination.currentPage, pagination.itemsPerPage, filters), {
        keepPreviousData: true
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiContacts, apiPagination] = reactQuery.data
            setPagination({ ...apiPagination, itemsPerPage: pagination.itemsPerPage })
            setContacts(apiContacts)
        }
    }, [reactQuery.isSuccess, reactQuery.data])

    useEffect(() => {
        if (page && page != pagination.currentPage) {
            pagination.getPage(page)
        }
    }, [page])

    useEffect(() => {
        if (itemsPerPage && itemsPerPage != pagination.itemsPerPage) {
            pagination.getItemsPerPage(itemsPerPage)
        }
    }, [itemsPerPage])



    const filter = (filters) => {
        setFilters(filters)
        setPagination({ ...pagination, currentPage: 1 })
    }

    const clearFilter = () => {
        setFilters(null)
        setPagination({ ...pagination, currentPage: 1 })
    }

    return {
        ...reactQuery,
        items: contacts,
        pagination,
        loading: reactQuery.isLoading,
        filter,
        clearFilter,
    }
}

export const useContactMutation = () => {
    const queryClient = useQueryClient();

    const update = useMutation(({ id, data }: { id: string, data: unknown }) => updateContact(id, data),
        {
            onSuccess: (_data, variables, _context) => {
                queryClient.invalidateQueries(['contact', variables.id], { active: true })
                queryClient.invalidateQueries('contacts')
            },
        })


    const create = useMutation((contact) => createContact(contact),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('contacts')
            },
        })

    const archive = useMutation(id => archiveContact(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('contacts')
            queryClient.invalidateQueries('contact', { active: true })
        },
    })

    return {
        update: update.mutate,
        updateAsync: update.mutateAsync,
        create: create.mutate,
        createAsync: create.mutateAsync,
        archive: archive.mutate
    }
}