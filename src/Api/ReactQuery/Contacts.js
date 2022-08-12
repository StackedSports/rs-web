import { useEffect, useState } from "react"
import { usePagination } from "Api/Pagination"
import { useQuery } from "react-query"
import { getContacts, filterContacts, getContact, getContactAssociatedMedia, getContactSentMedia, getContactConversation, getContactStats } from "Api/Endpoints"
import lodash from "lodash"

export const useContact = (id) => {
    const reactQuery = useQuery(['contact', id], () => getContact(id), {
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

export const useContactAssociatedMedia = (id, page, perPage) => {
    const [pagination, setPagination] = usePagination(page, perPage)
    const [associatedMedia, setAssociatedMedia] = useState([])

    const reactQuery = useQuery(['contact', 'associatedMedia', id, pagination.currentPage, pagination.itemsPerPage],
        () => getContactAssociatedMedia(id, pagination.currentPage, pagination.itemsPerPage),
        { enabled: !!id }
    )

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiAssociatedMedia, apiPagination] = reactQuery.data
            setAssociatedMedia(apiAssociatedMedia)
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

export const useContactSentMedia = (id, page, perPage) => {
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

export const useContactConversation = (id) => {
    const reactQuery = useQuery(['contact', 'conversation', id], () => getContactConversation(id), {
        enabled: !!id,
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}
export const useContactStats = (id) => {
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

export const useContacts = (currentPage, itemsPerPage, initialFilters) => {
    const [filters, setFilters] = useState(initialFilters)
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)
    const [contacts, setContacts] = useState()

    const get = filters && !lodash.isEmpty(filters) ? filterContacts : getContacts

    const reactQuery = useQuery(['contacts', pagination.currentPage, pagination.itemsPerPage, filters], () => get(pagination.currentPage, pagination.itemsPerPage, filters), {
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiContacts, apiPagination] = reactQuery.data
            setPagination({ ...apiPagination, itemsPerPage: itemsPerPage })
            setContacts(apiContacts)
        }
    }, [reactQuery.isSuccess, reactQuery.data])

    useEffect(() => {
        if (currentPage && currentPage != pagination.currentPage) {
            pagination.getPage(currentPage)
        }
    }, [currentPage])

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