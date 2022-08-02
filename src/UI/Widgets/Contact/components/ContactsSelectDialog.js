import React from 'react'
import { TabPanel } from '@mui/lab'
import ContactsTableServerMode from 'UI/Tables/Contacts/ContactsTableServerMode'
import SelectDialogTab from 'UI/Widgets/Dialogs/SelectDialogTab'
import useMultiPageSelection_V2 from 'Hooks/MultiPageSelectionHook_V2'


import { IconButton } from '@mui/material';
import { Clear } from '@mui/icons-material';

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

export const ContactsSelectDialog = ({ open, onClose, onSelectionConfirm, contacts, onSearch, onClearSearch }) => {
    const multipageSelection = useMultiPageSelection_V2(contacts.items)

    const handleSelectionConfirm = () => {
        onSelectionConfirm(multipageSelection.selectedData)
        multipageSelection.clear()
        onClose()
    }

    const handleClose = () => {
        multipageSelection.clear()
        onClose()
    }

    return (
        <SelectDialogTab
            open={open}
            onClose={handleClose}
            tabs={[{ id: '0', label: 'Contacts' }]}
            onConfirmSelection={handleSelectionConfirm}
            onSearch={onSearch}
            onClearSearch={onClearSearch}
            selectionLabel={getSelectionLabel(multipageSelection.count, multipageSelection.clear)}
        >
            <TabPanel value={'0'} sx={{ py: 1 }} >
                <ContactsTableServerMode
                    mini
                    contacts={contacts.items}
                    pagination={contacts.pagination}
                    loading={contacts.loading}
                    {...multipageSelection}
                />
            </TabPanel>

        </SelectDialogTab>
    )
}
