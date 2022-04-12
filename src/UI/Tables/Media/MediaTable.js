import { useState, useRef, useEffect, useMemo } from 'react'
import { Stack, Typography, Box, CircularProgress } from '@mui/material'

import { Link } from 'react-router-dom';


import Button from 'UI/Widgets/Buttons/Button'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'
import DataTable from 'UI/Tables/DataTable'

import MyMediaPreview from 'UI/Widgets/Media/MyMediaPreview'

import { mediaRoutes } from 'Routes/Routes';

import { columnsMedias, columnsPlaceHolders } from './MediaGridConfig'

/**
 * 
 * @param {object[]} items array of objects to display
 * @param {string} type type of the item ('placeholder' or 'media')
 * @param {boolean} loading true if the items are being loaded
 * @param {object} pagination pagination object
 * @param {boolean} disablePagination true if the pagination should be disabled
 * @param {function} onClickItem function to call when an item is clicked
 * @returns 
 */
const MediaTable = ({ items, loading, view = 'grid', type = 'media', pagination, disablePagination = false, onClickItem, linkTo }) => {
    const columns = useMemo(() => type === 'media' ? columnsMedias : columnsPlaceHolders, [type])

    const [selectedItems, setSelectedItems] = useState([]);

    const onSelectedItemsChange = (selectedItems) => {
        setSelectedItems(selectedItems);
    }

    const onLoadMore = () => {
        if (pagination.currentPage < pagination.totalPages) {
            pagination.getPage(pagination.currentPage + 1)
        }
    }

    return (
        <Box width='100%' pb={2}>
            <Box >
                {view === 'grid' ? (
                    <Stack gap={2} direction='row' flexWrap='wrap' >
                        {items && items.map(item => (
                            /* <MediaPreview
                                key={item.hashid || item.id}
                                type={type}
                                media={item}
                                onClick={onClickItem}                               
                            /> */
                            <MyMediaPreview
                                key={item.hashid || item.id}
                                type={type}
                                item={item}
                                linkTo={linkTo && `${linkTo}${item.id}`}
                            />
                        ))}
                    </Stack>
                ) : (
                    <DataTable
                        items={items}
                        columns={columns}
                        checkboxSelection
                        hidePagination={disablePagination}
                    />
                )}
            </Box>
            {loading && items && items.length > 0 && (
                <Box display='flex' justifyContent='center' mt={2} sx={{ height: 100 }}>
                    <CircularProgress />
                </Box>
            )}
            {pagination && <Button name='Load More' onClick={onLoadMore} />}
        </Box>
    )

}

export default MediaTable
