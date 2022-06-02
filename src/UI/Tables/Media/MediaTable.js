import { useState, useRef, useMemo, useEffect } from 'react'
import { Box, CircularProgress, Pagination, styled } from '@mui/material'

import DataTable from 'UI/Tables/DataTable'
import MediaCarousel from 'UI/Widgets/Media/MediaCarousel'
import MediaGrid from './MediaGrid'

import { columnsMedias, columnsPlaceHolders } from './MediaTableConfig'
import useMultiPageSelection_V2 from 'Hooks/MultiPageSelectionHook_V2'

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

    const scrollToTopTableRef = useRef(null)
    const [carouselIndex, setCarouselIndex] = useState(null)
    const multiPageSelection = props.multiPageSelection || useMultiPageSelection_V2(props.items)

    useEffect(() => {
        if (props.onSelectionChange)
            props.onSelectionChange(multiPageSelection.selectionModel, multiPageSelection.selectedData)
    }, [multiPageSelection.selectionModel])


    const onCellClick = ({ field, row }) => {
        if (field === 'urls') {
            setCarouselIndex(props.items.indexOf(row))
        }
    }

    const onPreviewClick = (item) => {
        setCarouselIndex(props.items.indexOf(item))
    }

    const onMediaGridSelectionChange = (selected, index, Item) => {
        if (props.disableMultipleSelection) {
            multiPageSelection.set([Item])
        }
        else if (selected) {
            multiPageSelection.add(Item.id)
        } else {
            multiPageSelection.remove(Item.id)
        }
    }

    // scroll to top of element ref
    const scrollToTop = () => {
        if (scrollToTopTableRef.current)
            scrollToTopTableRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: props.mini ? 500 : 'fit-content',
                flex: 1,
                pb: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
            ref={scrollToTopTableRef}
        >
            <Box position='relative' flex={1}>
                {!props.loading && props.items && props.items.length === 0 && (
                    <span>No media available</span>
                )}
                {view === 'grid' ? (
                    <MediaGrid
                        type={type}
                        items={props.items}
                        linkTo={props.linkTo}
                        selectionModel={multiPageSelection.selectionModel}
                        onSelectedChange={onMediaGridSelectionChange}
                        onSendClick={props.onSendClick}
                        onPreviewClick={onPreviewClick}
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
                        selection={multiPageSelection.selectionModel}
                        onSelectionChange={multiPageSelection.onSelectionModelChange}
                        checkboxSelection
                        disableSelectionOnClick
                        hidePagination={true}
                        onCellClick={onCellClick}
                        disableMultipleSelection={props.disableMultipleSelection}
                    />
                )}
                <StyledLoadingOverlay isLoading={props.loading} display='flex' justifyContent='center'>
                    <CircularProgress sx={{ position: 'sticky', left: '50%', top: '50%' }} />
                </StyledLoadingOverlay>
            </Box>
            {(props.pagination && props.pagination?.totalPages > 1)
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
                items={props?.items}
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
