import React, { useMemo, useState, useEffect } from 'react'
import { TabPanel } from '@mui/lab'
import { Box, IconButton } from '@mui/material';
import { Clear } from '@mui/icons-material';
import ContactsTableServerMode from 'UI/Tables/Contacts/ContactsTableServerMode'
import SelectDialogTab from 'UI/Widgets/Dialogs/SelectDialogTab'
import PanelFilters from 'UI/Widgets/PanelFilters'


import useMultiPageSelection_V2 from 'Hooks/MultiPageSelectionHook_V2'
import { useContacts, useGradYears, usePositions, useRanks, useStatus2, useStatuses, useTags, useTeamMembers } from 'Api/ReactQuery'
import { states, timeZones } from 'utils/Data'
import { getFullName } from 'utils/Parser'
import useLocalStorage from 'Hooks/useLocalStorage';
import { useContactPanelFiltersData } from 'UI/Tables/Contacts/ContactFilters';

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

    const [perPageLocalStorage, setperPageLocalStorage] = useLocalStorage(`contacts-select-dialog-perPage`, 50)
    const contacts = useContacts(1, perPageLocalStorage);
    const multipageSelection = useMultiPageSelection_V2(contacts.items)
    const [selectedFilters, setSelectedFilters] = useState({})
    const panelFiltersData = useContactPanelFiltersData()

    useEffect(() => {
        setperPageLocalStorage(contacts.pagination.itemsPerPage)
    }, [contacts.pagination.itemsPerPage])

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
            <Box sx={{ paddingInline: 3 }}>
                <PanelFilters open={true} filters={panelFiltersData} onFilterChange={onPanelFilterChange} />
            </Box>
            <TabPanel value={'0'} sx={{ py: 1 }} >
                <ContactsTableServerMode
                    id={"contacts-select-dialog"}
                    contacts={contacts.items}
                    pagination={contacts.pagination}
                    loading={contacts.loading}
                    selectedFilters={selectedFilters}
                    {...multipageSelection}
                />
            </TabPanel>
        </SelectDialogTab>
    )
}
