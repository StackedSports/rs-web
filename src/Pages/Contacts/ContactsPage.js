import { useState, useMemo, useEffect, useContext } from 'react';

import { AppContext } from 'Context/AppProvider'
import useSearchParams from "Hooks/SearchParamsHook";
import useLocalStorage from "Hooks/useLocalStorage";

import { useContacts } from 'Api/ReactQuery';


import BaseContactsPage from './BaseContactsPage';
import { getApiModel } from 'UI/Tables/Contacts/ContactDataGridConfig';

export default function ContactsPage(props) {
    const app = useContext(AppContext)
    const searchParams = useSearchParams();
    const [perPageLocalStorage, setperPageLocalStorage] = useLocalStorage(`contacts-table-perPage`, 50)
    const page = searchParams.page
    const perPage = searchParams.perPage || perPageLocalStorage
    const contacts = useContacts(page, perPage, {}, props.only_archived)

    const [selectedFilters, setSelectedFilters] = useState({})
    const [selectedSort, setSelectedSort] = useState({})

    useEffect(() => {
        const { pagination } = contacts
        const params = { page: pagination.currentPage, perPage: pagination.itemsPerPage }
        searchParams.setSearchParams(params)
        setperPageLocalStorage(pagination.itemsPerPage)
    }, [contacts.pagination.itemsPerPage, contacts.pagination.currentPage])

    const visibleTableRows = {
        profileImg: false,
        twitterName: true,
        phone: true,
        state: true,
        school: true,
        gradYear: true,
        rank: true,
        timeZone: true,
    }

    const onPanelFilterChange = (filter) => {
        setSelectedFilters(filter)
        contacts.filter({ ...filter, ...selectedSort })
    }

    const onSendMessageClick = (selectedData) => {
        app.sendMessageToContacts(selectedData)
    }

    const onContactSearch = (searchTerm) => {
        contacts.filter({ search: searchTerm })
    }

    const onContactSearchClear = () => {
        contacts.clearFilter()
    }

    const onSortingChange = (sorting) => {
        const sortObje = getApiModel(sorting)
        setSelectedSort(sortObje)

        const filter = { ...selectedFilters, ...sortObje }
        contacts.filter(filter)
    }

    return (
        <BaseContactsPage
            title="Contacts"
            contacts={contacts}
            disabledMainActions={props.only_archived}
            onlyArchived={props.only_archived}
            onSendMessage={onSendMessageClick}
            onSortingChange={onSortingChange}
            onPanelFilterChange={onPanelFilterChange}
            tableId="contacts-table"
            columnsControl={visibleTableRows}
            onContactSearch={!props.only_archived && onContactSearch}
            onContactSearchClear={onContactSearchClear}
        />

    )
}