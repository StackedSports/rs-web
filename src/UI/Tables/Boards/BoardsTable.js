import { Grid,Stack } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';

import { columns } from './DataGridConfig';

export default function BoardsTable(props) {
    // const columns = props.mini ? columnsMini : columnsFull
    

    // const onPageChange = (page, details) => {
    //     console.log(page)
    //     props.pagination.getPage(page + 1)
    // }

    const onPageChange = (e, page) => {
        console.log(page)
        props.pagination.getPage(page)
    }

    return (
        <Stack spacing={2} style={{ height: props.mini ? 500 : 850, width: '100%'}}>
            <DataGrid sx={{ m: 0 }}
            //   rows={props.contacts ? props.contacts : []}
              rows={props.contacts}
              columns={columns}
              checkboxSelection
              selectionModel={props.selection}
              onSelectionModelChange={props.onSelectionChange}
              hideFooter
              pageSize={props.pagination.itemsPerPage}
              rowsPerPageOptions={[props.pagination.itemsPerPage]}
              rowCount={props.pagination.totalItems}
              paginationMode='server'
              page={props.pagination.currentPage - 1}
              onPageChange={() => {}}
              loading={props.loading}
            //   disableColumnMenu={true}
            //   disableColumnSelector={true}
            />
            {props.pagination.totalPages > 1 && (
                <Grid container justifyContent="center" alignItems="center">
                    <Pagination
                        count={props.pagination.totalPages}
                        page={props.pagination.currentPage}
                        onChange={onPageChange}
                        disabled={props.loading}/>
                </Grid>
            )}
        </Stack>
    )
}