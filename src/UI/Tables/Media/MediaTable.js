import { useState, useRef, useEffect, useMemo } from 'react'
import { Stack, Typography, Box, CircularProgress } from '@mui/material'



import Button from 'UI/Widgets/Buttons/Button'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'
import DataTable from 'UI/Tables/DataTable'
import MediaCarousel from 'UI/Widgets/Media/MediaCarousel'


import { columnsMedias, columnsPlaceHolders } from './MediaGridConfig'

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

    // const selection = useArray(null, 'v2')
    const [selection, setSelection] = useState([])
    const [selectedControl, setSelectedControl] = useState({})
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
                control[selectionRef.current[foundIndex].id] = {
                    selected: false,
                    index: foundIndex
                }
            }
        }

        setSelectedControl(control)
        setSelection(selection)
        selectionRef.current = selection

        if (props.onSelectionChange)
            props.onSelectionChange(selection)
    }

    const onSendClick =(item) =>{
        if (props.onSendClick)
            props.onSendClick(item)
    }

    const onLoadMore = () => {
        if (props.pagination.currentPage < props.pagination.totalPages) {
            props.pagination.getPage(props.pagination.currentPage + 1)
        }
    }
    const isLastPage = props?.pagination?.currentPage === props?.pagination?.totalPages

    return (
        <Box width='100%' flex={1} pb={2}>
            <Box>
                {!props.loading && props.items && props.items.length === 0 && (
                    <span>No media available</span>
                )}
                {view === 'grid' ? (
                    <Stack gap={2} direction='row' flexWrap='wrap' >
                        {props.items && props.items.map((item, index) => (
                            <MediaPreview
                                key={item.hashid || item.id}
                                type={type}
                                item={item}
                                linkTo={props.linkTo && `${props.linkTo}/${item.id}`}
                                selected={selectedControl[item.id] ? selectedControl[item.id].selected : false}
                                onSelectedChange={(selected) => onMediaSelectedChange(selected, index, item)}
                                onSendClick={ props.onSendClick && (() => onSendClick(item))}
                            />
                        ))}
                    </Stack>
                ) : (
                    <DataTable
                        items={props.items}
                        columns={columns}
                        selection={selection}
                        onSelectionChange={onDataTableSelectionChange}
                        checkboxSelection
                        disableSelectionOnClick
                        hidePagination={disablePagination}
                        onCellClick={onCellClick}
                    />
                )}
            </Box>
            {props.loading && (
                <Box display='flex' justifyContent='center' mt={2} sx={{ height: 100 }}>
                    <CircularProgress />
                </Box>
            )}
            {(props.pagination && !isLastPage && !props.loading) && <Button name='Load More' onClick={onLoadMore} />}
            <MediaCarousel
                index={carouselIndex}
                items={props?.items?.map(item => item?.urls?.original)}
                onClose={() => setCarouselIndex(null)}
            />
        </Box>
    )

}

export default MediaTable
