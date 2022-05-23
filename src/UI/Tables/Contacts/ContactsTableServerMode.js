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
        if (row.field != '__check__')
            history.push(`${contactsRoutes.profile}/${row.id}`)
    }

    return (
        <Stack flex={height ? 0 : 1} sx={{ minHeight: '500px', height: height ? height : '100%' }}>
            <DataGridPro
                sx={{
                    m: 0,
                    '.MuiDataGrid-row:hover': { cursor: 'pointer' }
                }}
                checkboxSelection
                keepNonExistentRowsSelected
                rows={contacts || []}
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