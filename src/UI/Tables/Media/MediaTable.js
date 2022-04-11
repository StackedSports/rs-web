import { useState, useRef, useEffect, useMemo } from 'react'
import { Stack, Typography, Box, CircularProgress } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { KeyboardArrowDown } from '@mui/icons-material'

import { Link } from 'react-router-dom';


import Button from 'UI/Widgets/Buttons/Button'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'
import DataTable from 'UI/Tables/DataTable'

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
const MediaTable = ({ items, loading, view = 'grid', type = 'media', disablePagination = false, onClickItem }) => {
    const columns = useMemo(() => type === 'media' ? columnsMedias : columnsPlaceHolders, [type])

    return (
        <Box width='100%' pb={2}>
            <Box >
                {loading  && (
                    <Box
                        height='300px'
                        sx={{ display: 'grid', placeItems: 'center' }}
                    >
                        <CircularProgress />
                    </Box>
                )}
                {!loading && (view === 'grid' ? (
                    <Stack gap={2} direction='row' flexWrap='wrap' >
                        {items && items.map(item => (
                            <MediaPreview
                                key={item.id}
                                type={type}
                                media={item}
                                onClick={onClickItem}
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
                ))}
            </Box>
        </Box>
    )

}

export default MediaTable
