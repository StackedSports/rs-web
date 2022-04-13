import { useState, useEffect } from "react"

import { Stack } from '@mui/material'
import { Grid } from "@material-ui/core"
import { DataGrid } from '@mui/x-data-grid'
import Pagination from '@mui/material/Pagination'
// import Stack from '@mui/material/Stack'

const DataTable = (props) => {

    const [pagination, setPagination] = useState({
        itemsPerPage: 50,
        currentPage: 1,
        totalItems: 0,
        totalPages: 0,
    })

    useEffect(() => {
        if (!props.items)
            return

        setPagination({
            ...pagination,
            totalItems: props.items.length,
            totalPages: Math.ceil(props.items.length / 50)
        })

    }, [props.items])

    const onPageChange = (e, page) => {
        console.log(page)
        setPagination({
            ...pagination,
            currentPage: page
        })
    }

    let style = {}

    if(props.mini)
        style['height'] = 500

    return (
        <Stack spacing={2} style={{ width: '100%', ...style }}>
            <DataGrid sx={{ m: 0 }}
                //   rows={props.contacts ? props.contacts : []}
              autoHeight={props.mini ? false : true}
              rows={props.items}
              columns={props.columns}
              checkboxSelection={props.checkboxSelection}
              selectionModel={props.selection}
              onSelectionModelChange={props.onSelectionChange}
              loading={props.loading}
              page={pagination.currentPage - 1}
              rowCount={pagination.totalItems}
              hideFooter
              pageSize={props.pageSize || 50}
              rowsPerPageOptions={[props.rowsPerPageOptions || 50]}
            //   paginationMode='server'
            //   onPageChange={() => {}}
            //   disableColumnMenu={true}
            //   disableColumnSelector={true}
            />
            {!props.hidePagination && (
                <Stack justifyContent="center" alignItems="center">
                    <Pagination
                        count={pagination.totalPages}
                        page={pagination.currentPage}
                        onChange={onPageChange}
                        disabled={props.loading} />
                </Stack>
            )}

        </Stack>
    )
}

export default DataTable