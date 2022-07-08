import { useState, useMemo, useEffect, useContext } from 'react';

import { AppContext } from 'Context/AppProvider'
import useSearchParams from "Hooks/SearchParamsHook";
import useLocalStorage from "Hooks/useLocalStorage";

import { useContacts } from 'Api/ReactQuery';


import BaseContactsPage from './BaseContactsPage';

export default function ContactsPage(props) {
    const app = useContext(AppContext)
    const searchParams = useSearchParams();
    const [perPageLocalStorage] = useLocalStorage(`contacts-table-perPage`, 50)
    const page = searchParams.page
    const perPage = searchParams.perPage || perPageLocalStorage
    const contacts = useContacts(page, perPage)

    const [selectedFilters, setSelectedFilters] = useState({})
    const [selectedSort, setSelectedSort] = useState({})

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
        console.log('Filters selected', filter)
        setSelectedFilters(filter)
        contacts.filter({ ...filter, ...selectedSort })
    }

    const onSendMessageClick = (selectedData) => {
        app.sendMessageToContacts(selectedData)
    }

    const onContactSearch = (searchTerm) => {
        contacts.filter({ search: searchTerm })
        contacts.refetch()
    }

    const onContactSearchClear = () => {
        contacts.clearFilter()
    }

    const onSortingChange = (sorting) => {
        const filter = { ...selectedFilters }

        if (sorting.length === 0) {
            setSelectedSort({})
        } else {
            const field = sorting[0].field
            filter.sort_dir = sorting[0].sort

            switch (field) {
                case 'lastName':
                    filter.sort_column = 'last_name'
                    break
                case 'nickName':
                    filter.sort_column = 'nick_name'
                    break
                case 'twitterProfile':
                    filter.sort_column = 'twitter_profile'
                    break
                case 'phone':
                    filter.sort_column = 'phone'
                    break
                case 'state':
                    filter.sort_column = 'state'
                    break
                case 'school':
                    filter.sort_column = 'high_school'
                    break
                case 'gradYear':
                    filter.sort_column = 'grad_year'
                    break
                case 'position':
                    filter.sort_column = 'positions'
                    break
                case 'areaCoach':
                    filter.sort_column = 'area_coach'
                    break
                case 'positionCoach':
                    filter.sort_column = 'position_coach'
                    break
                case 'recruitingCoach':
                    filter.sort_column = 'coordinator'
                    break
                case 'status':
                    filter.sort_column = 'status'
                    break
                case 'status2':
                    filter.sort_column = 'status_2'
                    break
                case 'tags':
                    filter.sort_column = 'tags'
                    break
                case 'rank':
                    filter.sort_column = 'rank'
                    break
                case 'timeZone':
                    filter.sort_column = 'time_zone'
                    break
                case 'birthday':
                    filter.sort_column = 'dob'
                    break
                default:
                    filter.sort_column = 'first_name'
                    break
            }
            setSelectedSort({
                sort_dir: filter.sort_dir,
                sort_column: filter.sort_column
            })
        }
        contacts.filter(filter)
    }

    return (
        <BaseContactsPage
            title="Contacts"
            contacts={contacts}
            onSendMessage={onSendMessageClick}
            onSortingChange={onSortingChange}
            onPanelFilterChange={onPanelFilterChange}
            tableId="contacts-table"
            columnsControl={visibleTableRows}
            onContactSearch={onContactSearch}
            onContactSearchClear={onContactSearchClear}
        />

    )
}