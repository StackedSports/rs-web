import { useEffect, useState } from "react"
import { usePagination } from "Api/Pagination"
import { useQuery } from "react-query"
import { getContacts, filterContacts, getContact } from "Api/Endpoints"
import lodash from "lodash"

export const useContact = (id) => {
    const reactQuery = useQuery(`contact/${id}`, () => getContact(id), {
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

    const reactQuery = useQuery([`contacts/${pagination.currentPage}/${pagination.itemsPerPage}`, filters], () => get(pagination.currentPage, pagination.itemsPerPage, filters), {
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiContacts, apiPagination] = reactQuery.data
            setPagination(apiPagination)
            setContacts(apiContacts)
        }
    }, [reactQuery.isSuccess, reactQuery.data])

    const filter = (filters) => {
        setFilters(filters)
        setPagination({ ...pagination, currentPage: 1, itemsPerPage: itemsPerPage || 24 })
    }

    const clearFilter = () => {
        setFilters(null)
        setPagination({ ...pagination, currentPage: 1, itemsPerPage: itemsPerPage || 24 })
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