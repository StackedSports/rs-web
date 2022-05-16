import { useState, useEffect } from "react"

import { Stack } from '@mui/material'
import { DataGridPro } from '@mui/x-data-grid-pro';
import Pagination from '@mui/material/Pagination'


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
            <DataGridPro sx={{ m: 0 }}
                //   rows={props.contacts ? props.contacts : []}
              apiRef={props.apiRef}
              onStateChange={props.onStateChange}
              autoHeight={props.mini ? false : true}
              disableSelectionOnClick={props.disableSelectionOnClick ? true : false}
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
              onCellClick={props.onCellClick}
              onRowClick={props.onRowClick}
              onFilterModelChange={props.onFilterModelChange}
              filterModel={props.filterModel}
              components = {props.components}
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