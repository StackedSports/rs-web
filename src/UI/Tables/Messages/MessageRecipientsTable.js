import './MessageRecipientsTable.css'

import { useState, useEffect } from 'react'

import { Grid } from "@material-ui/core"
import { DataGrid } from '@mui/x-data-grid'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import { getColumns } from './DataGridConfig'
import MediaCarousel from 'UI/Widgets/Media/MediaCarousel'
import LoadingOverlay from 'UI/Widgets/LoadingOverlay'

const MessageRecipientsTable = (props) => {
    if(!props.recipients || props.recipients.length === 0)
        return (
            <div style={{ height: 300, position: 'relative' }}>
                {props.loading &&  <LoadingOverlay/>}
            </div>
        )

    // const columns = props.mini ? columnsMini : columnsFull
    const [contacts, setContacts] = useState([])
    const [columns, setColumns] = useState([])
    const [carouselIndex, setCarouselIndex] = useState(null)

    useEffect(() => {
        if(!props.recipients)
            return

        console.log(props.recipients)

        let tmp = []
        let hasFilters = false

        if(props.recipients.filter_list && props.recipients.filter_list.length > 0) {
            hasFilters = true

            props.recipients.filter_list.forEach(filter => {
                // tmp = tmp.concat(filter.contacts)
                filter.contacts.forEach(contact => {
                    tmp.push({
                        ...contact,
                        filterName: filter.name
                    })
                })
            })
        }

        if(props.recipients.contact_list)
            tmp = tmp.concat(props.recipients.contact_list)
        
        console.log(props.hasMedia)

        setContacts(tmp)
        setColumns(getColumns(props.platform?.name, tmp[0]?.placeholders, hasFilters, props.hasMedia, props.hasCoach))

    }, [props.recipients, props.platform, props.hasMedia, props.hasCoach])

    const onPageChange = (e, page) => {
        console.log(page)
        props.onPageChange(page)
    }
    console.log("contacts", contacts)

    const onCellClick = ({ field, row }) => {
        if (field === 'media') 
            setCarouselIndex(contacts.indexOf(row))
    }

    return (
        <Stack spacing={2} style={{ width: '100%', height: 600, position: 'relative' }}>
            {props.loading && <LoadingOverlay/>}
            <DataGrid sx={{ m: 0 }}
            //   rows={props.contacts ? props.contacts : []}
              rows={contacts}
              columns={columns}
              checkboxSelection
              selectionModel={props.selection}
              onSelectionModelChange={props.onSelectionChange}
              hideFooter
            //   autoPageSize
            //   autoHeight
            //   pageSize={props.pagination.itemsPerPage}
            //   rowsPerPageOptions={[props.pagination.itemsPerPage]}
            //   rowCount={props.pagination.totalItems}
            //   paginationMode='server'
            //   page={props.pagination.currentPage - 1}
            //   onPageChange={() => {}}
            //   loading={props.loading}
              onCellClick={onCellClick}
            //   disableColumnMenu={true}
            //   disableColumnSelector={true}
            />
            {props.pagination && props.pagination.totalPages > 1 && (
                <Grid container justifyContent="center" alignItems="center">
                    <Pagination
                      count={props.pagination.totalPages}
                      page={props.pagination.currentPage}
                      onChange={onPageChange}
                      disabled={props.loading}
                    />
                </Grid>
            )}

            <MediaCarousel
              index={carouselIndex}
              items={contacts?.map(item => item?.media?.urls?.original)}
              onClose={() => setCarouselIndex(null)}
            />
        </Stack>
    )
}

export default MessageRecipientsTable