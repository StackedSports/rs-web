import { useState, useRef, useMemo } from 'react'
import { Box, CircularProgress, Pagination, styled } from '@mui/material'



import Button from 'UI/Widgets/Buttons/Button'
import DataTable from 'UI/Tables/DataTable'
import MediaCarousel from 'UI/Widgets/Media/MediaCarousel'
import MediaGrid from './MediaGrid'

import { columnsMedias, columnsPlaceHolders } from './MediaTableConfig'

/**
 * 
 * @param {object[]} items array of objects to display
 * @param {string} type type of the item ('placeholder' or 'media')
 * @param {boolean} loading true if the items are being loaded
 * @param {object} pagination pagination object
 * @param {boolean} disablePagination true if the pagination should be disabled
 * @returns 
 */
const MediaTable = ({ view = 'grid', type = 'media', disablePagination = false, ...props }) => {
    const columns = useMemo(() => type === 'media' ? columnsMedias : columnsPlaceHolders, [type])

    const refScrollTopTable = useRef(null)

    // const selection = useArray(null, 'v2')
    const [selection, setSelection] = useState([])
    const [selectedControl, setSelectedControl] = useState({})

    // Array of selected item ids
    const selectionRef = useRef([])

    const [carouselIndex, setCarouselIndex] = useState(null)

    const onCellClick = ({ field, row }) => {

        if (field === 'urls') {
            setCarouselIndex(props.items.indexOf(row))
        }
    }

    const onMediaSelectedChange = (selected, index, item) => {
        let control = Object.assign({}, selectedControl)

        if (control[item.id]) {
            control[item.id].selected = selected

            if (selected)
                selectionRef.current.push(item.id)
            else
                selectionRef.current.splice(control[item.id].index, 1)
        } else {
            selectionRef.current.push(item.id)

            control[item.id] = {
                selected,
                index: selectionRef.current.length - 1
            }
        }

        // console.log(control)
        // console.log(selectionRef.current)

        setSelectedControl(control)
        setSelection(selectionRef.current)

        if (props.onSelectionChange)
            props.onSelectionChange(selectionRef.current)
    }

    const onDataTableSelectionChange = (selection) => {
        let control = Object.assign({}, selectedControl)

        if (selection.length > selectionRef.current.length) {
            // New selection from data table is bigger than
            // last selection. New selected item is at the
            // end of the array. Add new selected item to
            // selectedControl

            let index = selection.length - 1

            control[selection[index]] = {
                selected: true,
                index: selection.length - 1
            }
        } else {
            // New selection from data table is smaller than
            // last selection. An item has been removed from the
            // selection. We need to find the missing item's id
            // so we can updated it in the selectedControl.

            let foundIndex = -1

            selectionRef.current.every((id, index) => {
                if (id !== selection[index]) {
                    // The items don't match, which means the item
                    // on our last selection was removed from the
                    // current index we are accessing.

                    foundIndex = index

                    return false
                }

                return true
            })

            if (foundIndex !== -1) {
                control[selectionRef.current[foundIndex]] = {
                    selected: false,
                    index: foundIndex
                }
            }
        }

        // console.log(control)
        // console.log(selection)

        setSelectedControl(control)
        setSelection(selection)
        selectionRef.current = selection

        if (props.onSelectionChange)
            props.onSelectionChange(selection)
    }

    const onSendClick = (item) => {
        if (props.onSendClick)
            props.onSendClick(item)
    }

    const onLoadMore = () => {
        if (props.pagination.currentPage < props.pagination.totalPages) {
            props.pagination.getPage(props.pagination.currentPage + 1)
        }
    }

    // scroll to top of element ref
    const scrollToTop = () => {
        if (refScrollTopTable.current)
            refScrollTopTable.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Box width='100%' height={props.mini ? 500 : 'fit-content'} flex={1} pb={2} ref={refScrollTopTable}>
            <Box position='relative'>
                {!props.loading && props.items && props.items.length === 0 && (
                    <span>No media available</span>
                )}
                {view === 'grid' ? (
                    <MediaGrid
                        type={type}
                        items={props.items}
                        linkTo={props.linkTo}
                        selectedControl={selectedControl}
                        onSelectedChange={onMediaSelectedChange}
                        onSendClick={props.onSendClick}
                        xs={props.xs}
                        sm={props.sm}
                        md={props.md}
                        lg={props.lg}
                        xl={props.xl}
                    />
                ) : (
                    <DataTable
                        items={props.items}
                        columns={columns}
                        selection={selection}
                        onSelectionChange={onDataTableSelectionChange}
                        checkboxSelection
                        disableSelectionOnClick
                        hidePagination={true}
                        onCellClick={onCellClick}
                    />
                )}
                <StyledLoadingOverlay isLoading={props.loading} display='flex' justifyContent='center'>
                    <CircularProgress sx={{ position: 'sticky', left: '50%', top: '50%' }} />
                </StyledLoadingOverlay>
            </Box>
            {(props.pagination && props.items?.length > 0)
                && (
                    <Box display='flex' justifyContent='center' mt={2}>
                        <Pagination
                            count={props.pagination.totalPages}
                            page={props.pagination.currentPage}
                            onChange={(event, page) => { scrollToTop(); props.pagination.getPage(page) }}
                        />
                    </Box>
                )
            }

            <MediaCarousel
                index={carouselIndex}
                items={props?.items?.map(item => item?.urls?.original)}
                onClose={() => setCarouselIndex(null)}
            />
        </Box>
    )

}

export default MediaTable

const StyledLoadingOverlay = styled(Box)(({ theme, isLoading }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    transition: 'opacity 0.3s ease-in-out',
    visibility: isLoading ? 'visible' : 'hidden',
    zIndex: 30,
}));
