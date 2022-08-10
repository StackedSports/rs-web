import './MessageRecipientsTable.css'

import { useState, useEffect } from 'react'

import { DataGridPro } from '@mui/x-data-grid-pro';
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import { getColumns } from './DataGridConfig'
import MediaCarousel from 'UI/Widgets/Media/MediaCarousel'
import LoadingOverlay from 'UI/Widgets/LoadingOverlay'
import { CustomPagination } from 'UI/Widgets/Pagination/CustomPagination';

const MessageRecipientsTable = (props) => {
    if (!props.recipients || props.recipients.length === 0)
        return (
            <div style={{ height: 300, position: 'relative' }}>
                {props.loading && <LoadingOverlay />}
            </div>
        )

    // const columns = props.mini ? columnsMini : columnsFull
    const [contacts, setContacts] = useState([])
    const [columns, setColumns] = useState([])
    const [carouselIndex, setCarouselIndex] = useState(null)

    useEffect(() => {
        if (!props.recipients)
            return

        console.log(props.recipients)

        let tmp = []
        let hasFilters = false

        if (props.recipients.filter_list && props.recipients.filter_list.length > 0) {
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

        if (props.recipients.contact_list)
            tmp = tmp.concat(props.recipients.contact_list)

        setContacts(tmp)
        setColumns(getColumns(props.platform?.name, tmp[0]?.placeholders, hasFilters, props.hasMedia, props.hasCoach))

    }, [props.recipients, props.platform, props.hasMedia, props.hasCoach])

    const onPageChange = (e, page) => {
        props.onPageChange(page)
    }

    const onCellClick = ({ field, row }) => {
        if (field === 'media')
            setCarouselIndex(contacts.indexOf(row))
    }

    return (
        <Stack spacing={2} sx={{ flex: 1, minHeight: '500px', position: 'relative' }}>
            {props.loading && <LoadingOverlay />}
            <DataGridPro sx={{ m: 0 }}
                rows={contacts}
                columns={columns}
                checkboxSelection
                keepNonExistentRowsSelected
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
                onCellClick={onCellClick}
            />
            {props.pagination && (
                <CustomPagination
                    currentPage={props.pagination.currentPage}
                    perPage={props.pagination.itemsPerPage}
                    totalPages={props.pagination.totalPages}
                    totalItems={props.pagination.totalItems}
                    onPageChange={onPageChange}
                    onPerPageChange={props.onPerPageChange}
                    perPageOptions={[5,25, 50, 100,200]}
                />
                /* <Stack justifyContent="center" alignItems="center">
                    <Pagination
                        count={props.pagination.totalPages}
                        page={props.pagination.currentPage}
                        onChange={onPageChange}
                        disabled={props.loading}
                    />
                </Stack> */
            )}

            <MediaCarousel
                index={carouselIndex}
                items={contacts?.map(item => item?.media)}
                onClose={() => setCarouselIndex(null)}
            />
        </Stack>
    )
}

export default MessageRecipientsTable