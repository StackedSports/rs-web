import { Box, Stack, Pagination as MuiPagination } from "@mui/material"
import {
    DataGridPro,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid-pro';
import { useHistory } from "react-router-dom";

import { contactsRoutes } from 'Routes/Routes';
import { columnsMini, columnsFull } from './DataGridConfig';
import { useContactTableColumns } from 'Api/Hooks'

export default function ContactsTableServerMode({
    contacts,
    pagination,
    id,
    height,
    redirectToDetails,
    columnsControl,
    ...restOfProps
}) {
    const history = useHistory();
    const columns = columnsFull
    const visibleColumns = useContactTableColumns(columnsControl, id)

    const onColumnVisibilityModelChange = (newModel) => {
        visibleColumns.onChange(newModel)
    }

    const onPageChange = (page) => {
        pagination.getPage(page + 1)
    }

    const redirectToDetailsPage = (row) => {
        console.log(row)
        if (row.field != '__check__' && row.field != '__tree_data_group__' && row.rowNode.depth === 0)
            history.push(`${contactsRoutes.profile}/${row.id}`)
    }

    const getTreeData = () => {
        if (contacts) {
            return contacts.map(contact => {
                let result = { ...contact, hierarchy: [contact.id] }
                const children = contact.relationships.map(relationship => {
                    return { ...relationship, hierarchy: [...result.hierarchy, relationship.id] }
                })
                return [result, ...children]
            }).flat()
        } else
            return []
    }

    const getTreeDataPath = (row) => row.hierarchy;

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

    return (
        <Stack flex={height ? 0 : 1} sx={{ minHeight: '55vh', height: height ? height : '100%' }}>
            <DataGridPro
                sx={{
                    m: 0,
                    '.MuiDataGrid-row:hover': { cursor: 'pointer' }
                }}
                checkboxSelection
                keepNonExistentRowsSelected
                rows={getTreeData() || []}
                treeData
                disableChildrenFiltering
                disableChildrenSorting
                getTreeDataPath={getTreeDataPath}
                isRowSelectable={(params) => Object.hasOwnProperty.call(params.row, 'relationships')}
                groupingColDef={groupingColDef}
                rowCount={pagination?.totalItems}
                columns={columns}
                paginationMode={pagination && 'server'}
                sortingMode={pagination && 'server'}
                // filterMode='server' it need to be implemented, so filter is desabled
                disableColumnFilter
                pagination
                pageSize={pagination?.itemsPerPage}
                onColumnVisibilityModelChange={onColumnVisibilityModelChange}
                columnVisibilityModel={visibleColumns.items}
                onPageChange={onPageChange}
                components={{
                    Pagination: CustomPagination,
                    Footer: CustomFooter
                }}
                onCellClick={redirectToDetails && redirectToDetailsPage}
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

//Custom mui data grid footer
function CustomFooter() {
    return <Stack direction={'row'} sx={{ p: 1, borderColor: 'divider' }} justifyContent='center' borderTop={1} >
        <Box>
            <CustomPagination />
        </Box>
    </Stack>
}