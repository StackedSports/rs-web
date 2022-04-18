import { Grid } from "@material-ui/core"
import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

import { columnsMini, columnsFull } from './DataGridConfig';
import { de } from "date-fns/locale";

export default function ContactsTable(props) {
    // const columns = props.mini ? columnsMini : columnsFull
    const columns = columnsFull
    const [visibleColumns, setVisibleColumns] = useState({
        profileImg: true,
        fullname: true,
        firstName: false,
        lastName: false,
        nickName: false,
        twitterName: true,
        phone: true,
        state: true,
        school: true,
        gradYear: true,
        position: false,
        areaCoach: false,
        recruitingCoach: false,
        status: false,
        status2: false,
        rank: false,
        // lastMessaged: false,
        // mostActiveTime: false,
        // dateAdded: false,
        timeZone: false,
        birthday: false,
    })

    // const onPageChange = (page, details) => {
    //     console.log(page)
    //     props.pagination.getPage(page + 1)
    // }

    const onColumnVisibilityModelChange = (newModel) => {
        setVisibleColumns(newModel)
    }

    const onPageChange = (e, page) => {
        props.onPageChange(page)
    }


    return (
        <Stack spacing={2} style={{ height: props.mini ? 500 : 850, width: '100%' }}>
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
                onPageChange={() => { }}
                loading={props.loading}
                columnVisibilityModel={visibleColumns}
                onColumnVisibilityModelChange={onColumnVisibilityModelChange}
            //   disableColumnMenu={true}
            //   disableColumnSelector={true}
            />
            <Grid container justifyContent="center" alignItems="center">
                <Pagination
                    count={props.pagination.totalPages}
                    page={props.pagination.currentPage}
                    onChange={onPageChange}
                    disabled={props.loading} />
            </Grid>
        </Stack>
    )
}