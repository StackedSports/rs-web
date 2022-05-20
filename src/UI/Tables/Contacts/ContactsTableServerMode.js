import { Box, Stack, Pagination as MuiPagination } from "@mui/material"
import {
    DataGridPro,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid-pro';
import { DataGrid } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom";

import { contactsRoutes } from 'Routes/Routes';
import { columnsMini, columnsFull } from './DataGridConfig';
import { useContactTableColumns } from 'Api/Hooks'

export default function ContactsTableServerMode({
    contacts,
    pagination,
    id,
    mini,
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

    const onCellClick = (row) => {
        if (row.field != '__check__')
            history.push(`${contactsRoutes.profile}/${row.id}`)
    }

    return (
        <Stack flex={1} sx={{ minHeight: '500px' }}>
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
                paginationMode='server'
                sortingMode='server'
                filterMode='server'
                pagination
                pageSize={pagination?.itemsPerPage}
                onColumnVisibilityModelChange={onColumnVisibilityModelChange}
                columnVisibilityModel={visibleColumns.items}
                onPageChange={onPageChange}
                onSelectionModelChange={(newSelectionModel) => {
                    console.log(newSelectionModel);
                }}
                components={{
                    Pagination: CustomPagination,
                    Footer: CustomFooter
                }}
                onCellClick={redirectToDetails && onCellClick}
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
    return <Stack direction={'row'} sx={{ p: 1 }} justifyContent='center'>
        <Box>
            <CustomPagination />
        </Box>
    </Stack>
}