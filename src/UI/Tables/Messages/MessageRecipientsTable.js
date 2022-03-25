import './MessageRecipientsTable.css'

import { useState, useEffect } from 'react'

import { Grid } from "@material-ui/core"
import { DataGrid } from '@mui/x-data-grid'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import { getColumns } from './DataGridConfig'

const MessageRecipientsTable = (props) => {
    // const columns = props.mini ? columnsMini : columnsFull
    const [contacts, setContacts] = useState([])
    const [columns, setColumns] = useState([])

    useEffect(() => {
        console.log(props.recipients)
        if(!props.recipients)
            return

        let tmp = []

        if(props.recipients.filter_list) {
            props.recipients.filter_list.forEach(filter => {
                tmp = tmp.concat(filter.contacts)
            })
        }

        if(props.recipients.contact_list)
            tmp = tmp.concat(props.recipients.contact_list)
        
        console.log(tmp)

        setContacts(tmp)
        setColumns(getColumns(props.platform?.name, tmp[0]?.placeholders))

    }, [props.recipients, props.platform])

    // useEffect(() => {
    //     if(!props.platform || !contacts)
    //         return
        
    //     let { platform } = props

    //     console.log(contacts)

    //     if(contacts.placeholders) {

    //     }

    //     if(platform === 'Twitter')
    //         setColumns(twitterColumns)
    //     else
    //         setColumns(phoneColumns)

    // }, [props.platform, contacts])

    const onPageChange = (e, page) => {
        console.log(page)
        props.onPageChange(page)
    }

    return (
        <Stack spacing={2} style={{ width: '100%' }}>
            <DataGrid sx={{ m: 0 }}
            //   rows={props.contacts ? props.contacts : []}
              rows={contacts}
              columns={columns}
              checkboxSelection
            //   selectionModel={props.selection}
            //   onSelectionModelChange={props.onSelectionChange}
              hideFooter
            //   autoPageSize
              autoHeight
            //   pageSize={props.pagination.itemsPerPage}
            //   rowsPerPageOptions={[props.pagination.itemsPerPage]}
            //   rowCount={props.pagination.totalItems}
            //   paginationMode='server'
            //   page={props.pagination.currentPage - 1}
            //   onPageChange={() => {}}
              loading={props.loading}
            //   disableColumnMenu={true}
            //   disableColumnSelector={true}
            />
            <Grid container justifyContent="center" alignItems="center">
                {/* <Pagination
                    count={props.pagination.totalPages}
                    page={props.pagination.currentPage}
                    onChange={onPageChange}
                    disabled={props.loading}/> */}
            </Grid>
        </Stack>
    )
}

export default MessageRecipientsTable