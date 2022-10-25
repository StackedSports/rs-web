import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Box, Stack, Pagination as MuiPagination, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import {
    DataGridPro,
    gridPageCountSelector,
    gridPageSelector,
    gridPageSizeSelector,
    gridRowCountSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid-pro';
import { useHistory } from "react-router-dom";

import { contactsRoutes } from 'Routes/Routes';
import { columnsMini, columnsFull, getColumnsByPreferences } from './ContactDataGridConfig';
import { useContactTableColumns } from 'Api/Hooks'
import lodash from 'lodash'
import { PreferencesContext } from "Context/PreferencesProvider";

const ContactsTableServerMode = ({
    contacts,
    pagination,
    id,
    height,
    mini,
    redirectToDetails,
    columnsControl,
    sortingMode,
    selectedFilters,
    showDisabledColumns,
    ...restOfProps
}) => {
    const history = useHistory();
    const columns = getColumnsByPreferences(mini,showDisabledColumns)
    const visibleColumns = useContactTableColumns(columnsControl, id)
    const [tempVisibleColumns, setTempVisibleColumns] = useState(null)
    const preferences = useContext(PreferencesContext)

    useEffect(() => {
        if (!selectedFilters) return
        const collums = Object.keys(selectedFilters)
        const activeCollums = Object.entries(visibleColumns.items).
            filter(([, value]) => value === true).
            map(([key]) => key)
        const dif = lodash.difference(collums, activeCollums).reduce((acc, cur) => ({ ...acc, [cur]: true }), {})
        if (!lodash.isEmpty(dif)) {
            setTempVisibleColumns({ ...visibleColumns.items, ...dif })
        }
        else {
            setTempVisibleColumns(null)
        }
    }, [selectedFilters, visibleColumns.items])

    const onColumnVisibilityModelChange = (newModel) => {
        visibleColumns.onChange(newModel)
    }

    const onPageChange = (page) => {
        pagination.getPage(page + 1)
    }

    const onPageSizeChange = (size) => {
        pagination.getItemsPerPage(size)
    }

    const redirectToDetailsPage = (row) => {
        if (row.field != '__check__' && row.field != '__tree_data_group__' && row.rowNode.depth === 0)
            history.push(`${contactsRoutes.profile}/${row.id}`)
    }

    const getIsRowSelectable = (params) => {
        return Object.hasOwnProperty.call(params.row, 'relationships')
    }

    const treeData = useMemo(() => {
        if (!contacts) return []
        if (mini) return contacts

        if (contacts && contacts.length > 0) {
            return contacts.map(contact => {
                let result = { ...contact, hierarchy: [contact.id] }
                let children = []
                if (contact.relationships)
                    children = contact?.relationships.map(relationship => {
                        return { ...relationship, hierarchy: [...result.hierarchy, relationship.id] }
                    })
                return [result, ...children]
            }).flat()
        }
        return contacts
    }, [contacts, mini])

    const getTreeDataPath = (row) => row.hierarchy;

    const groupingColDefPreference = useMemo(() => {
        const groupingColDef = {
            headerName: 'Relationships',
            valueGetter: (params) => {
                if (params.rowNode.depth === 0)
                    return params.rowNode.children ? 'Members' : ''
                else
                    return params.row?.relationship_type?.description
            },
            flex: 1,
            minWidth: 200,
        }

        if (!preferences) return groupingColDef
        else {
            const relationshipsLabel = new Map(preferences.labels).get('relationships')?.label
            return relationshipsLabel ? { ...groupingColDef, headerName: relationshipsLabel } : groupingColDef
        }
    }, [preferences])

    return (
        <Stack flex={height ? 0 : 1} sx={{ minHeight: '55vh', height: height ? height : '100%' }}>
            <DataGridPro
                sx={{
                    m: 0,
                    '.MuiDataGrid-row:hover': { cursor: 'pointer' }
                }}
                checkboxSelection
                disableSelectionOnClick
                keepNonExistentRowsSelected
                rows={treeData}
                treeData={mini ? false : true}
                disableChildrenFiltering
                disableChildrenSorting
                getTreeDataPath={getTreeDataPath}
                isRowSelectable={mini ? null : getIsRowSelectable}
                groupingColDef={groupingColDefPreference}
                rowCount={pagination?.totalItems}
                columns={columns}
                paginationMode={pagination && 'server'}
                sortingMode={sortingMode || 'server'}
                // filterMode='server' it need to be implemented, so filter is desabled
                disableColumnFilter
                pagination
                pageSize={pagination?.itemsPerPage}
                page={(pagination?.currentPage - 1) || 0}
                onColumnVisibilityModelChange={onColumnVisibilityModelChange}
                columnVisibilityModel={tempVisibleColumns ?? visibleColumns.items}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
                components={{
                    Pagination: CustomPagination,
                    Footer: CustomFooter
                }}
                onCellClick={redirectToDetails && redirectToDetailsPage}
                hideFooter={contacts?.length === 0}
                {...restOfProps}
            />
        </Stack>
    )
}

function CustomPagination(props) {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <MuiPagination
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
            {...props}
        />
    );
}

function CustomFooter(props) {
    const apiRef = useGridApiContext();
    const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
    const page = useGridSelector(apiRef, gridPageSelector);
    const rowCount = useGridSelector(apiRef, gridRowCountSelector);

    return <Box
        sx={{
            p: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            justifyItems: 'center',
            alignItems: 'center',
            gap: 1,
        }}
        borderTop={1}
    >
        <Stack gap={1} direction='row' alignItems='center'>
            <Typography variant='subtitle2'>
                Contacts per page:
            </Typography>
            <Select variant='standard' disableUnderline value={pageSize} onChange={(e) => apiRef.current.setPageSize(e.target.value)}>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={75}>75</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={200}>200</MenuItem>
            </Select>
        </Stack>
        <CustomPagination />
        <Typography variant='subtitle2' justifySelf='flex-end'>
            {page * pageSize + 1} - {(page + 1) * pageSize > rowCount ? rowCount : (page + 1) * pageSize} of {rowCount}
        </Typography>
    </Box>
}

export default ContactsTableServerMode