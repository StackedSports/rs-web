import { useState, useEffect } from "react"

import { Grid } from "@material-ui/core"
import { DataGrid } from '@mui/x-data-grid'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import { columns } from './TagsGridConfig'

const TagsTable = (props) => {
    const [pagination, setPagination] = useState({
        itemsPerPage: 50,
        currentPage: 1,
        totalItems: 0,
        totalPages: 0,
    })

    useEffect(() => {
        if(!props.tags)
            return
        
        setPagination({
            ...pagination,
            totalItems: props.tags.length,
            totalPages: Math.ceil(props.tags.length / 50)
        })

    }, [props.tags])

    const onPageChange = (e, page) => {
        console.log(page)
        setPagination({
            ...pagination,
            currentPage: page
        })
    }

    return (
        <Stack spacing={2} style={{ height: props.mini ? 500 : 850, width: '100%'}}>
            <DataGrid sx={{ m: 0 }}
            //   rows={props.contacts ? props.contacts : []}
              rows={props.tags}
              columns={columns}
              checkboxSelection
              selectionModel={props.selection}
              onSelectionModelChange={props.onSelectionChange}
              hideFooter
              pageSize={50}
              rowsPerPageOptions={[50]}
              rowCount={pagination.totalItems}
            //   paginationMode='server'
              page={pagination.currentPage - 1}
            //   onPageChange={() => {}}
              loading={props.loading}
            //   disableColumnMenu={true}
            //   disableColumnSelector={true}
            />
            <Grid container justifyContent="center" alignItems="center">
                <Pagination
                    count={pagination.totalPages}
                    page={pagination.currentPage}
                    onChange={onPageChange}
                    disabled={props.loading}/>
            </Grid>
        </Stack>
    )
}

export default TagsTable