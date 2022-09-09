import React, { useMemo, useState } from 'react'
import { TabPanel } from '@mui/lab'
import { IconButton } from '@mui/material';
import { Clear } from '@mui/icons-material';
import ContactsTableServerMode from 'UI/Tables/Contacts/ContactsTableServerMode'
import SelectDialogTab from 'UI/Widgets/Dialogs/SelectDialogTab'
import PanelFilters from 'UI/Widgets/PanelFilters'


import useMultiPageSelection_V2 from 'Hooks/MultiPageSelectionHook_V2'
import { useContacts, useGradYears, usePositions, useRanks, useStatus2, useStatuses, useTags, useTeamMembers } from 'Api/ReactQuery'
import { states, timeZones } from 'utils/Data'
import { getFullName } from 'utils/Parser'

const getSelectionLabel = (selectionCount, clearSelection) => {
    return (
        <>
            {`${selectionCount} Contacts Selected`}
            <IconButton size='small' color='inherit' onClick={clearSelection}>
                <Clear fontSize="inherit" />
            </IconButton>
        </>
    )
}

export const ContactsSelectDialog = ({ open, onClose, onSelectionConfirm }) => {

    const contacts = useContacts();
    const multipageSelection = useMultiPageSelection_V2(contacts.items)
    const [selectedFilters, setSelectedFilters] = useState({})
    //filters
    const status = useStatuses()
    const status2 = useStatus2()
    const ranks = useRanks()
    const gradYears = useGradYears()
    const tags = useTags()
    const positions = usePositions()
    const teamMembers = useTeamMembers()

    const handleSelectionConfirm = () => {
        onSelectionConfirm(multipageSelection.selectedData)
        handleClose()
    }

    const handleClose = () => {
        multipageSelection.clear()
        setSelectedFilters({})
        contacts.clearFilter()
        onClose()
    }

    const onPanelFilterChange = (filters) => {
        setSelectedFilters(prev => {
            const search = prev?.search
            const newfilters = search ? { ...filters, search } : filters
            contacts.filter(newfilters)
            return newfilters
        })
    }

    const onSearch = (searchTerm) => {
        setSelectedFilters(prev => {
            const newFilters = { ...prev, search: searchTerm }
            contacts.filter(newFilters)
            return newFilters
        })
    }

    const onClearSearch = () => {
        setSelectedFilters(prev => {
            const filters = { ...prev }
            delete filters['search']
            contacts.filter(filters)
            return filters
        })
    }

    const panelFiltersData = useMemo(() =>
    ({
        status: {
            label: 'Status',
            options: status.items || [],
            optionsLabel: 'status',
        },
        ranks: {
            label: 'Rank',
            options: ranks.items || [],
            optionsLabel: 'rank',
        },
        years: {
            label: 'Grad Year',
            options: gradYears.items?.map((item, index) => ({ id: index, name: item })) || [],
        },
        tags: {
            label: 'Tags',
            options: tags.items || [],
            onSearch: (search) => tags.search(search),
        },
        positions: {
            label: 'Position',
            options: positions.items || [],
        },
        area_coaches: {
            label: 'Area Coach',
            options: teamMembers.items || [],
            optionsLabel: (option) => getFullName(option),
        },
        position_coaches: {
            label: 'Position Coach',
            options: teamMembers.items || [],
            optionsLabel: (option) => getFullName(option),
        },
        timezones: {
            label: 'Time Zone',
            options: timeZones,
        },
        dob: {
            label: 'Birthday',
            type: 'date',
            format: 'MM/dd',
            optionsLabel: (dates) => dates.join(' - '),
            isUnique: true
        },
        states: {
            label: 'State',
            options: states,

        },
        status_2: {
            label: 'Status 2',
            options: status2.items.map((status2, index) => ({ name: status2 })) || [],
        },
    }), [status.items, ranks.items, gradYears.items, tags.items, positions.items, teamMembers.items, status2.items])

    return (
        <SelectDialogTab
            maxWidth={'lg'}
            open={open}
            onClose={handleClose}
            tabs={[{ id: '0', label: 'Contacts' }]}
            onConfirmSelection={handleSelectionConfirm}
            onSearch={onSearch}
            onClearSearch={onClearSearch}
            selectionLabel={getSelectionLabel(multipageSelection.count, multipageSelection.clear)}
        >
            <PanelFilters open={true} filters={panelFiltersData} onFilterChange={onPanelFilterChange} />
            <TabPanel value={'0'} sx={{ py: 1 }} >
                <ContactsTableServerMode
                    contacts={contacts.items}
                    pagination={contacts.pagination}
                    loading={contacts.loading}
                    {...multipageSelection}
                />
            </TabPanel>

        </SelectDialogTab>
    )
}
