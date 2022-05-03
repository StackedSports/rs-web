import { Grid } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { columnsMini, columnsFull } from './DataGridConfig';
import { useContactTableColumns } from 'Api/Hooks'

export default function ContactsTable(props) {
    // const columns = props.mini ? columnsMini : columnsFull
    const columns = columnsFull

    const visibleColumns = useContactTableColumns(props.columnsControl)

    // const onPageChange = (page, details) => {
    //     console.log(page)
    //     props.pagination?.getPage(page + 1)
    // }

    const onColumnVisibilityModelChange = (newModel) => {
        // setVisibleColumns(newModel)
        visibleColumns.onChange(newModel)
    }

    const onPageChange = (e, page) => {
        props.onPageChange(page)
    }

    return (
        <Stack spacing={2} style={{ height: props.mini ? 500 : 850 }}>
            <DataGrid sx={{ m: 0 }}
                //   rows={props.contacts ? props.contacts : []}
                rows={props.contacts}
                columns={columns}
                checkboxSelection
                selectionModel={props.selection}
                onSelectionModelChange={props.onSelectionChange}
                hideFooter
                pageSize={props.pagination?.itemsPerPage}
                rowsPerPageOptions={[props.pagination?.itemsPerPage]}
                rowCount={props.pagination?.totalItems}
                paginationMode='server'
                page={props.pagination?.currentPage - 1}
                onPageChange={() => { }}
                loading={props.loading}
                columnVisibilityModel={visibleColumns.items}
                onColumnVisibilityModelChange={onColumnVisibilityModelChange}
                sortingMode="server"
                onSortModelChange={props.onSortingChange}
                disableColumnSelector={props.disableColumnSelector}
                disableColumnFilter={props.disableColumnFilter}
                disableColumnMenu={props.disableColumnMenu}
            //   disableColumnMenu={true}
            //   disableColumnSelector={true}

            />
            {!props.hidePagination &&
                <Grid container justifyContent="center" alignItems="center">
                    <Pagination
                        count={props.pagination?.totalPages}
                        page={props.pagination?.currentPage}
                        onChange={onPageChange}
                        disabled={props.loading} />
                </Grid>}
        </Stack>
    )
}